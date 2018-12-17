// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
// 余磊
// 对话框显示在顶层

(function($) {
	
	$.alerts_mc = {
		
		// These properties can be read/written by accessing $.alerts_mc.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .3,                // transparency level of overlay
		overlayColor: '#000',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;是&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;否&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts_mc._show(title, message, null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts_mc._show(title, message, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts_mc._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts_mc._hide();
			$.alerts_mc._overlay('show');
			
			$("BODY", window.top.document).append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts_mc.dialogClass ) $("#popup_container", window.top.document).addClass($.alerts_mc.dialogClass);
			
			// IE6 Fix
            jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';
			
			$("#popup_container", window.top.document).css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title", window.top.document).text(title);
			$("#popup_content", window.top.document).addClass(type);
			$("#popup_message", window.top.document).text(msg);
			$("#popup_message", window.top.document).html( $("#popup_message", window.top.document).text().replace(/\n/g, '<br />') );
			
			$("#popup_container", window.top.document).css({
				minWidth: $("#popup_container", window.top.document).outerWidth(),
				maxWidth: $("#popup_container", window.top.document).outerWidth()
			});
			
			$.alerts_mc._reposition();
			$.alerts_mc._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message", window.top.document).after('<div id="popup_panel"><input type="button" value="' + $.alerts_mc.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok", window.top.document).click( function() {
						$.alerts_mc._hide();
						callback(true);
					});
					$("#popup_ok", window.top.document).focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok", window.top.document).trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message", window.top.document).after('<div id="popup_panel"><input type="button" value="' + $.alerts_mc.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts_mc.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok", window.top.document).click( function() {
						$.alerts_mc._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel", window.top.document).click( function() {
						$.alerts_mc._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok", window.top.document).focus();
					$("#popup_ok, #popup_cancel", window.top.document).keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok", window.top.document).trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel", window.top.document).trigger('click');
					});
				break;
				break;
				case 'prompt':
					$("#popup_message", window.top.document).append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts_mc.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts_mc.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt", window.top.document).width( $("#popup_message", window.top.document).width() );
					$("#popup_ok", window.top.document).click( function() {
						var val = $("#popup_prompt", window.top.document).val();
						$.alerts_mc._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel", window.top.document).click( function() {
						$.alerts_mc._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel", window.top.document).keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok", window.top.document).trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel", window.top.document).trigger('click');
					});
					if( value ) $("#popup_prompt", window.top.document).val(value);
					$("#popup_prompt", window.top.document).focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts_mc.draggable ) {
				try {
					$("#popup_container", window.top.document).draggable({ handle: $("#popup_title", window.top.document) });
					$("#popup_title", window.top.document).css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container", window.top.document).remove();
			$.alerts_mc._overlay('hide');
			$.alerts_mc._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts_mc._overlay('hide');
					$("BODY", window.top.document).append('<div id="popup_overlay"></div>');
					$("#popup_overlay", window.top.document).css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(window.top.document).height(),
						background: $.alerts_mc.overlayColor,
						opacity: $.alerts_mc.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay", window.top.document).remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window.top).height() / 2) - ($("#popup_container", window.top.document).outerHeight() / 2)) + $.alerts_mc.verticalOffset;
			var left = (($(window.top).width() / 2) - ($("#popup_container", window.top.document).outerWidth() / 2)) + $.alerts_mc.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
            jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window.top).scrollTop();
			
			$("#popup_container", window.top.document).css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay", window.top.document).height( $(window.top.document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts_mc.repositionOnResize ) {
				switch(status) {
					case true:
						$(window.top).bind('resize', $.alerts_mc._reposition);
					break;
					case false:
						$(window.top).unbind('resize', $.alerts_mc._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert_mc = function(message, title, callback) {
		$.alerts_mc.alert(message, title, callback);
	}
	
	jConfirm_mc = function(message, title, callback) {
		$.alerts_mc.confirm(message, title, callback);
	};
		
	jPrompt_mc = function(message, value, title, callback) {
		$.alerts_mc.prompt(message, value, title, callback);
	};
	
})(jQuery);