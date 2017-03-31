(function($$){
	$$.fn.extend({banner: function(newobj){
		obj = {
			pre: true,
			next: true,
			preWidth: 50,
			preHeight: 100,
			icon: false,
			icon_click: false,
			icon_old_color: 'orange',
			icon_width: 30,
			icon_new_color: 'yellow',
			autoplay: true,
			autotime: 3000,
			pre_back: null,
			next_back: null,
			pre_backImg: null,
			next_backImg: null,
			icon_height: 30,
			iconBottom: 20,
			preLeft: 20,
			nextRight: 20,
			vertical: false,
		};
		obj.width = this.width();
		obj.height = this.height();
		for(var i in newobj){
			obj[i] = newobj[i];
		}
		var child = this.children('div').children('div').css({width: obj.width, height: obj.height, position: 'absolute', top: 0}),
			parent = child.eq(0).parent(),
			sibling_ul = $$('<ul></ul>'),
			index = 0, control = true, autoplay;
		this.append(sibling_ul);
		this.css({width: obj.width, height: obj.height, position: 'relative', overflow: 'hidden'});
		child.each(function(i){
			if(i != 0){
				$$(this).css({left: obj.width})
			} else {
				$$(this).css({left: 0})
			}
			$$(this).children('img').css({display: 'block', border: 'none', width: obj.width, height: obj.height});
		})
		if(obj.icon){
			child.each(function(i){
				sibling_ul.append('<li></li>');
			})
			var sibling_ul_child = sibling_ul.children();
			sibling_ul.css({bottom: obj.iconBottom, position: 'absolute', overflow: 'hidden', height: obj.icon_height, listStyle: 'none', left: '50%', width: sibling_ul_child.length * (obj.icon_width + 5) - 5, marginLeft: -(sibling_ul_child.length * (obj.icon_width + 5) - 5)/2});
			sibling_ul_child.css({width: obj.icon_width, cursor: 'pointer', height: obj.icon_height, marginLeft: 5, float: 'left', background: obj.icon_old_color, borderRadius: '50%'});
			sibling_ul_child.first().css({marginLeft: 0, backgroundColor: obj.icon_new_color});
		}
		if(obj.vertical){
			obj.width = 0;
		} else {
			obj.height = 0;
		}
		function play(){
			if(!control){return;}
				control = false;
				var old = index;
				index = ++index > child.length - 1 ? 0 : index;
				if(obj.icon){
					sibling_ul_child.css({background: obj.icon_old_color}).eq(index).css({background: obj.icon_new_color});
				}
				child.eq(old).animate({left: -obj.width, top: -obj.height});
				child.eq(index).css({left: obj.width, top: obj.height}).animate({left: 0, top: 0}, function(){
					control = true;
				});
		}
		if(obj.next){
			var sibling_next = $$('<div></div>');
			this.append(sibling_next);
			sibling_next.css({right: obj.nextRight, display: 'none', cursor: 'pointer', width: obj.preWidth, height: obj.preHeight, position: 'absolute', top: '50%', marginTop: -obj.preHeight/2, backgroundColor: obj.next_back, backgroundSize: '100% 100%'});
			sibling_next.click(play);
			if(obj.next_backImg){
				sibling_next.css({ backgroundImage: 'url(' + obj.next_backImg + ')'});
			}
		}
		if(obj.pre){
			var sibling_pre = $$('<div></div>');
			this.append(sibling_pre);
			sibling_pre.css({left: obj.preLeft, display: 'none', width: obj.preWidth, cursor: 'pointer', height: obj.preHeight, position: 'absolute', top: '50%', marginTop: -obj.preHeight/2, backgroundColor: obj.pre_back, backgroundSize: '100% 100%'});
			sibling_pre.click(function(){
				if(!control){ return; }
				control = false;
				var old = index;
				index = --index < 0 ? child.length - 1 : index;
				if(obj.icon){
					sibling_ul_child.css({background: obj.icon_old_color}).eq(index).css({background: obj.icon_new_color});
				}
				child.eq(old).animate({left: obj.width, top: obj.height});
				child.eq(index).css({left: -obj.width, top: -obj.height}).animate({left: 0, top: 0}, function(){
					control = true;
				});
			})
			if(obj.pre_backImg){
				sibling_pre.css({backgroundImage: 'url(' + obj.pre_backImg + ')'});
			}
		}
		if(obj.icon_click){
			sibling_ul_child.click(function(){
				if(!control){return;}
				control = false;
				var old = index;
					index = $(this).index();
					if(index == old){
						control = true;
						return;
					}
					if(index > old){
						child.eq(old).animate({left: -obj.width, top: -obj.height});
						child.eq(index).css({left: obj.width, top: obj.height}).animate({left: 0, top: 0}, function(){
							control = true;
						});
					} else {
						child.eq(old).animate({left: obj.width, top: obj.height});
						child.eq(index).css({left: -obj.width, top: -obj.height}).animate({left: 0, top: 0}, function(){
							control = true;
						});
					}
					sibling_ul_child.css({background: obj.icon_old_color}).eq(index).css({background: obj.icon_new_color});
			})
		}
		if(obj.autoplay){
			function auto(){
				autoplay = setTimeout(function(){
					play();
					auto();
				}, obj.autotime)
			}
			auto();
		}
		this.hover(function(){
			if(obj.autoplay){
				clearTimeout(autoplay);
			}
			if(obj.next){
				sibling_next.show();
			}
			if(obj.pre){
				sibling_pre.show();
			}
		}, function(){
			if(obj.autoplay){
				autoplay = setTimeout(function(){
					play();
					auto();
				}, obj.autotime);
			}
			if(obj.next){
				sibling_next.hide();
			}
			if(obj.pre){
				sibling_pre.hide();
			}
		})
	}})
})(jQuery)