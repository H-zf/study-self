<template>
    <div>
        <svg style="width:400px;height:400px;" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="100" fill="#fdd">
                
            </circle>
            <foreignObject x="100" y="200" width="200" height="100">
                <div xmlns="http://www.w3.org/1999/xhtml" style="padding:0 5px" class="yichu">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed mollis mollis mi ut ultricies. Nullam magna ipsum,
                    porta vel dui convallis, rutrum imperdiet eros. Aliquam
                    erat volutpat.
                </div>
            </foreignObject>
            <!-- 文字的判断是可以将文字的字符串进行循环 然后依次相加  比较其长度和设定的长度 -->
            <!-- 就是svg会将viewBox的这样一个大小放进去  得将宽高变成150px * 150px 缩小了多少 x * 400 = 150  x = 150 / 400 所以此时viewBox的大小是150px * 150px  
            此时的circle就变成了 200 * 150 / 400 = 75px cx = 75px cy = 75px r = 37.5px -->
            <!-- <foreignObject x="20" y="20" width="160" height="160">
              <div xmlns="http://www.w3.org/1999/xhtml">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed mollis mollis mi ut ultricies. Nullam magna ipsum,
                porta vel dui convallis, rutrum imperdiet eros. Aliquam
                erat volutpat.
              </div>
            </foreignObject> -->
        </svg>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .yichu {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: default;
        pointer-events: none;
        -moz-user-select:none;
        -webkit-user-select:none;
        user-select:none;
    }
</style>