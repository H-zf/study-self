<template>
    <div id="graph">

    </div>
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
                    {id:'d',name:'123456'},
                    {id:'f',name:'1234567'},
                    {id:'g',name:'12345678'},
                    {id:'h',name:'123456789'},
                    {id:'i',name:'123456789'},
                    {id:'j',name:'123456789'},
                    {id:'k',name:'123456789'},
                    {id:'l',name:'123456789'},
                    {id:'m',name:'123456789'},
                    {id:'n',name:'123456789'},
                    {id:'o',name:'123456789'},
                    {id:'p',name:'123456789'},
                    {id:'q',name:'123456789'},
                    {id:'r',name:'123456789'},
                    {id:'s',name:'123456789'},
                    {id:'t',name:'123456789'},
                    {id:'u',name:'123456789'},
                    {id:'v',name:'123456789'},
                    {id:'w',name:'123456789'},
                    {id:'x',name:'123456789'},
                    {id:'y',name:'123456789'},
                    {id:'z',name:'123456789'}
                ],
                links:[
                    {source:"a",target:"b",id:"link1"},
                    {source:"b",target:"c",id:"link2"},
                    {source:"c",target:"a",id:"link3"}
                ]
            }
        },
        mounted() {
            let parentNode = document.querySelector('#graph')
            //获取父元素的宽高 
            console.log('parentNode.getBoundingClientRect()',parentNode.getBoundingClientRect())
            let width = parentNode.getBoundingClientRect().width
            let height = parentNode.getBoundingClientRect().height
            let parentSvg = d3.select('#graph').append("svg")
                        .attr("width", width)
                        .attr("height", height)
            let g = parentSvg.append('g')
                        .attr('class','everything')
            let nodeSvg = g.append("g")
                        .attr("class", "nodes")
                        .selectAll('.node')
                        .data(this.nodes)
                        .enter()
                        .append('g')
                        .attr('id',(d)=>{
                            return d.id
                        })
                        .append('circle')
                        .attr('r','20')
            // 事件的圆是不是也来一次 找到对应的父元素然后添加相应的圆

            let linksSvg = g.append("g")
                        .attr("class", "links")
                        .selectAll('.link')
                        .data(this.links)
                        .enter()
                        .append('g')
                        .attr('id',(d)=>{
                            return d.id
                        })


            // 对links和nodes进行一次仿真
            const simulation = d3.forceSimulation().force(this.links,d3.forceLink().id(d => d.id))
                                .force('change',d3.forceManyBody().strength(d => {
                                    const {nodeRadius: radius} = d
                                    const defStr = -80
                                    const radStr = -radius * 4
                                    return radStr < defStr ? radStr : defStr
                                }))
                                .force('center',d3.forceCenter(width/2,height/2))
                                .force('collision',d3.forceCollide().radius(d => d.nodeRadius + 1))
            simulation.alphaDecay(1 / 10)

            simulation.nodes(this.nodes)
            // simulation.force('link').link(this.links)
            function ticked(){
                nodeSvg.attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                })
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