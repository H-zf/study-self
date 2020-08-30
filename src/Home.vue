<template>
    <div id="graph">

    </div>
    <!-- <svg width="100%" height="100%" version="1.1"
        xmlns="http://www.w3.org/2000/svg">

        <path d="M205,410 Q217,390 230,369"
        style="fill:blue;stroke:red;stroke-width:2"/>

</svg> -->
</template>

<script>
    import * as d3 from 'd3'
    export default {
        data() {
            return {
                nodes:[
                    {id:"a",name:'123'},
                    {id:"b",name:'1234'},
                    {id:'c',name:'12345'},
                    {id:'c',name:'12345'},
                    {id:'d',name:'12345'},
                    {id:'e',name:'12345'},
                    {id:'f',name:'12345'},
                    {id:'g',name:'12345'},
                    {id:'h',name:'12345'},
                    {id:'i',name:'12345'},
                    {id:'j',name:'12345'},
                    {id:'k',name:'12345'},
                ],
                links:[
                    {source:"a",target:"b",id:"link1"},
                    {source:"b",target:"c",id:"link2"},
                    {source:"c",target:"a",id:"link3"},
                    {source:"d",target:"c",id:"link3"},
                    {source:"e",target:"f",id:"link3"},
                    {source:"f",target:"d",id:"link3"},
                    {source:"g",target:"f",id:"link3"},
                    {source:"h",target:"g",id:"link3"},
                    {source:"i",target:"h",id:"link3"},
                    {source:"j",target:"i",id:"link3"},
                    {source:"k",target:"k",id:"link3"}
                ]
            }
        },
        methods: {
            
        },
        mounted() {
            let parentNode = document.querySelector('#graph')
            //获取父元素的宽高 
            console.log('parentNode.getBoundingClientRect()',parentNode.getBoundingClientRect())
            let width = parentNode.getBoundingClientRect().width
            let height = parentNode.getBoundingClientRect().height
            function zoomed(){
                let transform = d3.zoomTransform(this)
                g.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")")
            }

            let drag = d3.drag()
                        .on('start',function(){
                            simulation.stop()
                        })
                        .on('end',function(){
                            d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
                            ticked()
                            simulation.resume()
                        })
                        .on('drag',function(d){
                            // d.px += d3.event.dx
                            // d.py += d3.event.dy
                            // 已将数据中的x y进行了修改 此时调用ticked只是重新计算位置
                            d.x += d3.event.dx //d3.event.dx是相当于移动的时候相对于上一次移动了多少 所以要加等
                            d.y += d3.event.dy
                            ticked() //此时ticked 相当于重新计算一次坐标
                        })
            let parentSvg = d3.select('#graph').append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .call(d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed))
            let g = parentSvg.append('g')
                        .attr('class','everything')
            let defs = g.append('defs')
                        .attr('class','defs')

            defs.selectAll('marker')
                .data(this.links)
                .enter()
                .append('marker')
                .attr('id',d => {
                    return d.target
                })
                .attr('view-box','0 0 12 12')
                .attr('refX',"6")
                .attr('refY',"6")
                .attr('markerWidth','12')
                .attr('markerHeight','12')
                .attr('orient','auto')
                .append('path')
                .attr('d',"M2,2 L10,6 L2,10 L6,6 L2,2")
                .attr('fill','#ccc')
            
              // 画两个圆试试 todo
              let linksSvg = g.append("g")
                        .attr("class", "links")
                        .selectAll("path")
                        .data(this.links)
                        .enter()
                        .append('path')
           
            let nodeParent = g.append("g")
                        .attr("class", "nodes")
                        .selectAll('.node')
                        .data(this.nodes)
                        .enter()
                        .append('g')
                        .attr('id',d => d.id)
                        .call(drag)

            // 分先后的生成两个圆 后面会将之前的进行覆盖
            let displayNodeSvg = nodeParent
                        .append('circle')
                        .attr('class','displayCircle')
                        .attr('id',d => (d.id + '-inherit'))
                        .attr('r','20')
                        .attr('fill','red')
                        .attr('stroke','none')
            let eventNodeSvg = nodeParent
                        .append('circle')
                        .attr('class','eventCircle')
                        .attr('id',d => d.id)
                        .attr('r','20')
                        .attr('fill','#0000ff')
                        .attr('stroke','none')
            // 事件的圆是不是也来一次 找到对应的父元素然后添加相应的圆 todo
           

            // 对links和nodes进行一次仿真
            const simulation = d3.forceSimulation().force('link',d3.forceLink().id(d => d.id))//绑定id是为了防止报错出missing a
                                .force('charge',d3.forceManyBody().strength(d => {
                                    //strength 电荷力  正值代表吸引力 负值代表排斥力 默认为30
                                    const {nodeRadius: radius} = d
                                    const defStr = -80
                                    const radStr = -radius * 4
                                    console.log('radStr < defStr',radStr < defStr)
                                    // return radStr < defStr ? radStr : defStr
                                    return -80
                                }))
                                .force('center',d3.forceCenter(width/2,height/2))
                                .force('collision',d3.forceCollide(50).strength(0.2).iterations(5))
            simulation.alphaDecay(0.999)

            simulation.nodes(this.nodes)
            simulation.force('link').links(this.links) //线的仿真
            function computedPath(source,target,linkSize,linkIndex){
                let n1 = displayNodeSvg.select(`[id="${source.id}"]`)
                let n2 = displayNodeSvg.select(`[id="${target.id}"]`)
                let x1 = source.x,
                y1 = source.y,
                x2 = target.x,
                y2 = target.y,
                r1 = source.r || 20,
                r2 = target.r || 20,
                path = '',
                offsetArc,
                rotateArc,
                startX,
                startY,
                endX,
                endY,
                curveLength,
                cx1 = 0,
                cy1 = 0,
                cx2 = 0,
                cy2 = 0,
                textLength,
                tx = 0,
                ty = 0,
                tReverse,
                transform = '',
                verticalArc,
                linkLength,
                offsetLength,
                qx,
                qy,
                angle
                if(source.id === target.id){
                    let arc = 2 * Math.PI / linkSize * (linkIndex - 1)
                    angle = arc * 180 / Math.PI
                    offsetArc = 15 * Math.PI / 180
                    rotateArc = 90 * Math.PI / 180
                    startX = x1 + Math.cos(arc - offsetArc + rotateArc) * r1
                    startY = y1 + Math.sin(arc - offsetArc + rotateArc) * r1
                    endX = x1 + Math.cos(arc + offsetArc + rotateArc) * (r1 + 12)
                    endY = y1 + Math.sin(arc + offsetArc + rotateArc) * (r1 + 12)
                    curveLength = 100
                    cx1 = startX + Math.cos(arc - offsetArc + rotateArc) * curveLength
                    cy1 = startY + Math.sin(arc - offsetArc + rotateArc) * curveLength
                    cx2 = endX + Math.cos(arc + offsetArc + rotateArc) * curveLength
                    cy2 = endY + Math.sin(arc + offsetArc + rotateArc) * curveLength
                    textLength = curveLength - 20
                    tx = (startX + Math.cos(arc - offsetArc + rotateArc) * textLength + endX + Math.cos(arc + offsetArc + rotateArc) * textLength / 2)
                    ty = (startY + Math.sin(arc - offsetArc + rotateArc) * textLength + endY + Math.sin(arc + offsetArc + rotateArc) * textLength / 2)
                    tReverse = angle > 90 && angle < 270 ? 180 : 0
                    path = {
                        startX:Math.ceil(startX),
                        startY:Math.ceil(startY),
                        cx1:Math.ceil(cx1),
                        cy1:Math.ceil(cy1),
                        cx2:Math.ceil(cx2),
                        cy2:Math.ceil(cy2),
                        endX:Math.ceil(endX),
                        endY:Math.ceil(endY)
                    }
                    // path = `M${startX},${startY},C${cx1},${cy1},${cx2},${cy2},${endX},${endY}`
                    transform = `translate(${tx},${ty}) rotate(${angle + tReverse})`
                } else {
                    let direct = (linkIndex % 2 === 0 ? 1 : -1) * (source.id < target.id ? 1 : -1)
                    linkIndex = linkSize % 2 === 0 ? Math.floor((linkSize + 1) / 2) * direct : Math.floor( linkSize / 2) * direct
                    let arc = Math.atan2(y1 - y2,x2 - x1) //  两个节点圆心连线斜率对应的弧度
                    console.log('arc----',arc)
                    angle = arc * 180 / Math.PI // 弧度对应的角度
                    console.log('angle----',angle)
                    offsetArc = linkIndex * 15 * Math.PI / 180
                    console.log('offsetArc----',offsetArc)
                    startX = x1 + Math.cos(arc + offsetArc) * r1
                    startY = y1 - Math.sin(arc + offsetArc) * r1
                    endX = x2 - Math.cos(arc - offsetArc) * (r2 + 6)
                    endY = y2 + Math.sin(arc - offsetArc) * (r2 + 6)
                    verticalArc = - Math.atan2(x2 - x1,y1 - y2)
                    linkLength = Math.sqrt((Math.pow(endX - startX,2) + Math.pow(endY - startY,2))) // 起点与终点连线的长度
                    offsetLength = linkLength / 2 / linkSize * linkIndex // 根据线条的总数和序号计算出的曲线偏移长度
                    qx = (startX + endX) / 2 - Math.cos(verticalArc) * offsetLength
                    qy = (startY + endY) / 2 + Math.sin(verticalArc) * offsetLength
                    tx = angle > -90 && angle < 90 ? (startX + endX) / 2 - Math.cos(verticalArc) * (offsetLength / 2 + 4) : (startX + endX) / 2 - Math.cos(verticalArc) * (offsetLength / 2 - 4)
                    ty = angle > -90 && angle < 90 ? (startY + endY) / 2 - Math.sin(verticalArc) * (offsetLength / 2 + 4) : (startY + endY) / 2 - Math.sin(verticalArc) * (offsetLength / 2 - 4)
                    tReverse = angle > 90 || angle < -90 ? 180 : 0
                    console.log('startX----',startX)
                    path = {
                        startX:Math.ceil(startX),
                        startY:Math.ceil(startY),
                        qx:Math.ceil(qx),
                        qy:Math.ceil(qy),
                        endX:Math.ceil(endX),
                        endY:Math.ceil(endY)
                    }
            //         path = `M${startX},${startY} Q${qx},${qy} ${endX},${endY}` //二次贝塞尔曲线
                    transform = `translate(${tx},${ty}) rotate(${-angle + tReverse})`
            }

                return {path ,transform}
            }
            function ticked(){
                displayNodeSvg.attr("cx", d => d.x)
                              .attr("cy", d => d.y)
                eventNodeSvg.attr("cx", d => d.x)
                            .attr("cy", d => d.y)
                linksSvg.attr("d", (d) => {
                    let path = computedPath(d.source,d.target,1,1)
                    if(!path.path.qx){
                        // `M${startX},${startY},C${cx1},${cy1},${cx2},${cy2},${endX},${endY}
                        return `M${path.path.startX},${path.path.startY} C${path.path.cx1},${path.path.cy1},${path.path.cx2},${path.path.cy2},${path.path.endX},${path.path.endY}`
                    }
                    return `M${path.path.startX},${path.path.startY} Q${path.path.qx},${path.path.qy} ${path.path.endX},${path.path.endY}`

                })
                .attr('marker-end',d => 'url(#a)')
                .attr('fill','none')
                .attr('stroke','red')
                .attr('stroke-width','1')
            }
            simulation.on('tick',() => {
                ticked()
            })
        }
    }
</script>

<style>
    #graph {
        width: 100%;
        height: 800px;
    }
</style>