(function(window,$){
/**
 * resizeable-x 
 * @param Jquery element
 * @returns {jquery-resizeablex_L1.Resizablex}
 * @author xilei
 */
//resize handle html 
var handleTpl = '<div class="resizable-handle resizable-{d}"></div>';

var resizeHandles = {
        n:function(resize){
            var resizeh = resize.h+resize.t-resize.y;
            if(resizeh<0){
                return ;
            }
            resize.h = resizeh;
            resize.t = resize.y;               
            resize.top();
            resize.height();
        },
        e:function(resize){
            resize.w = resize.x - resize.l;
            resize.width();
        },
        s:function(resize){
            resize.h = resize.y - resize.t;
            resize.height();
        },
        w:function(resize){
            var resizew = resize.w+resize.l-resize.x;
            if(resizew<0){
                return ;
            }
            resize.w = resizew; 
            resize.l = resize.x;
            resize.left();
            resize.width();
        },
        se:function(resize){
            this.s(resize);this.e(resize);
        },
        sw:function(resize){
            this.s(resize);this.w(resize);
        },
        ne:function(resize){
            this.n(resize);this.e(resize);
        },
        nw:function(resize){
            this.n(resize);this.w(resize);
        }
};

var _current = null;

var Resizablex = function(element){
         var _pos = element.position();
         this.dom = element;
         this.w = this.dom.width();
         this.h = this.dom.height();
         this.l = _pos.left;
         this.t = _pos.top;
         this.x = 0;
         this.y = 0;
         this.direction = null;
         this.controls = {};
         this.init();
     };    

    Resizablex.prototype = {

        init:function(){
            for(var direction in resizeHandles){
                this.controls[direction] = $(handleTpl.replace('{d}',direction));
                this.dom.append(this.controls[direction]);
                this.controls[direction]
                        .bind('mousedown',{direction:direction},$.proxy(this,'_mousedown'));
            }
        },

        _mousedown:function(e){
            e.stopPropagation();
            this.direction = e.data.direction;
            _current = this;
            return true;
        },

        width:function(value){
            if(!value){
                value = this.w;
            }
            this.dom.width(value < 0 ? 0 :value);
            return this;
        },
        height:function(value){
            if(!value){
                value = this.h;
            }
            this.dom.height(value < 0 ? 0 :value);
            return this;
        },

        left:function(value){
            if(value===undefined){
                value = this.l;
            }
            this.dom.css('left',value);
        },

        top:function(value){
            if(value===undefined){
                value = this.t;
            }
            this.dom.css('top',value);
        },
        
        //@todo disabled some direction  resize 
        disabled:function(){

        },
        
        //@todo enabled some direction  resize 
        enabled:function(){

        },
        
        //@todo dragable for element
        dragable:function(){

        }

};
//less callback
$(window.document).bind('mousemove',function(e){
    if(!_current){
        return true;
    }
    e.preventDefault();
    e.stopPropagation();
    _current.x = e.clientX;
    _current.y = e.clientY;
    resizeHandles[_current.direction](_current);
}).bind('mouseup',function(e){
    if(!_current){
        return true;
    }
    e.stopPropagation();
    _current.direction = null;
    _current = null;
});

$.fn.resizeablex = function(){
    $.each(this,function(){
       new Resizablex($(this));
    });
};

})(window,jQuery);
