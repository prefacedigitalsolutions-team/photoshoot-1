"use strict";



var docReady = function docReady(fn) {
  // see if DOM is already available

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};


var isRTL = function isRTL() {
  return document.querySelector('html').getAttribute('dir') === 'rtl';
};
var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};
/*eslint consistent-return: */






// nav related
var utils = {

  isRTL: isRTL
};


// nav section

var fancyNavInit = function fancyNavInit() {
  var ClassName = {
    SHOW: 'show',
    PLAY: 'play',
    COLLAPSED: 'collapsed',
    FANCYNAVBAR_LEFT: 'fancynavbar-left',
    FANCYNAVBAR_TOP: 'fancynavbar-top'
  };
  var Selector = {
    FANCYNAVBAR: '.fancynavbar',
    FANCYNAVBAR_LEFT: '.fancynavbar-left',
    FANCYNAVBAR_TOGGLERBAR: '.fancynavbar-togglerbar',
    FANCYNAVBAR_BRAND_IMG: '.fancynavbar-brand-img',
    FANCYNAVBAR_ADDON: '.fancynavbar-addon',
    FANCYNAVBAR_COLLAPSE: '.fancynavbar-collapse',
    FANCYNAVBAR_TOGGLER: '.fancynavbar-toggler',
    FANCYNAVBAR_TOGGLER_ICON: '.fancynavbar-toggler-icon',
    PATH_TOP: '#path-top',
    PATH_MIDDLE: '#path-middle',
    PATH_BOTTOM: '#path-bottom',
    FANCYNAV_LINK: '.fancynav-link',
    FANCY_DROPDOWN: '.fancy-dropdown',
    FANCY_DROPDOWN_MENU: '.fancy-dropdown-menu',
    FANCY_DROPDOWN_TOGGLE: '.fancy-dropdown-toggle',
    FANCY_DROPDOWN_ITEM: '.fancy-dropdown-item',
    DATA_ONE_PAGE: '[data-one-page]',
    ONE_PAGER_DROPDOWN_ITEM: '.fancy-dropdown-item[data-one-page]'
  };
  var DATA_KEY = {
    ZANIM_XS: 'data-zanim-xs',
    ZANIM_MD: 'data-zanim-md',
    ZANIM_LG: 'data-zanim-lg',
    EXCLUSIVE: 'data-exclusive'
  };
  var Events = {
    CLICK: 'click',
    SCROLL: 'scroll',
    RESIZE: 'resize'
  };
  var EASE = 'CubicBezier';
  var fancynavbar = document.querySelector(Selector.FANCYNAVBAR);
  var isFancynavbarLeft = fancynavbar === null || fancynavbar === void 0 ? void 0 : fancynavbar.classList.contains(ClassName.FANCYNAVBAR_LEFT);
  var isFancynavbarTop = fancynavbar === null || fancynavbar === void 0 ? void 0 : fancynavbar.classList.contains(ClassName.FANCYNAVBAR_TOP);

  /*-----------------------------------------------
  |   RTL compatibility
  -----------------------------------------------*/

  if ((utils.isRTL() || isFancynavbarLeft) && !(utils.isRTL() && isFancynavbarLeft)) {
    var fancyNavbarBrandImg = document.querySelector(Selector.FANCYNAVBAR_BRAND_IMG);
    var fancyNavbarTogglerIcon = document.querySelector(Selector.FANCYNAVBAR_TOGGLER_ICON);
    var fancyNavbarAddon = document.querySelector(Selector.FANCYNAVBAR_ADDON);
    var reverseZanimData = function reverseZanimData(el) {
      var attrObj = JSON.parse(el.getAttribute(DATA_KEY.ZANIM_LG));
      attrObj.from.x = -attrObj.from.x;
      var attrStr = JSON.stringify(attrObj);
      el.setAttribute(DATA_KEY.ZANIM_LG, attrStr);
    };
    reverseZanimData(fancynavbar);
    reverseZanimData(fancyNavbarBrandImg);
    reverseZanimData(fancyNavbarTogglerIcon);
    reverseZanimData(fancyNavbarAddon);
  }
  if (isFancynavbarTop) {
    var _fancyNavbarBrandImg = document.querySelector(Selector.FANCYNAVBAR_BRAND_IMG);
    var _fancyNavbarTogglerIcon = document.querySelector(Selector.FANCYNAVBAR_TOGGLER_ICON);
    var _fancyNavbarAddon = document.querySelector(Selector.FANCYNAVBAR_ADDON);
    var setZanimData = function setZanimData(el, anim) {
      var animStr = JSON.stringify(anim);
      el.setAttribute(DATA_KEY.ZANIM_LG, animStr);
    };
    var reverseZanimDataY = function reverseZanimDataY(el, val) {
      var attrObj = JSON.parse(el.getAttribute(DATA_KEY.ZANIM_LG));
      attrObj.from.y = -val;
      var attrStr = JSON.stringify(attrObj);
      el.setAttribute(DATA_KEY.ZANIM_LG, attrStr);
    };
    var anim = JSON.parse(fancynavbar.getAttribute(DATA_KEY.ZANIM_XS));
    var childAnim = _objectSpread(_objectSpread({}, anim), {}, {
      delay: 0.4
    });
    var addonAnim = _objectSpread(_objectSpread({}, anim), {}, {
      delay: 0.5
    });
    setZanimData(fancynavbar, anim);
    setZanimData(_fancyNavbarBrandImg, childAnim);
    reverseZanimDataY(_fancyNavbarBrandImg, 38);
    setZanimData(_fancyNavbarTogglerIcon, childAnim);
    setZanimData(_fancyNavbarAddon, addonAnim);
    reverseZanimDataY(_fancyNavbarAddon, 30);
  }
  if (fancynavbar) {
    var fancyNavbarCollapse = document.querySelector(Selector.FANCYNAVBAR_COLLAPSE);
    var fancyNavbarToggler = document.querySelector(Selector.FANCYNAVBAR_TOGGLER);
    var exclusive = document.querySelector("[".concat(DATA_KEY.EXCLUSIVE, "]"));
    var x = '100%';
    (utils.isRTL() || isFancynavbarLeft) && !(utils.isRTL() && isFancynavbarLeft) && (x = '-100%');


    //  Fancy Navbar Collapse Animation
  
    var fancyNavbarCollapseTimeline = window.gsap.timeline().pause();
    var fancyNavItems = document.querySelectorAll("".concat(Selector.FANCYNAV_LINK, ", ").concat(Selector.FANCY_DROPDOWN_MENU));
    //$fancyNavItems.css('opacity', 0);

    fancyNavbarCollapseTimeline.fromTo(fancyNavbarCollapse, 0.6, {
      x: x
    }, {
      x: '0%',
      ease: EASE
    }).staggerFromTo(Array.from(fancyNavItems), 0.8, {
      y: 56,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: EASE
    }, 0.05, '-=0.4');
  
    // End of Drawer Animation


   
  //   Fancy Navbar Toggler Icon Animation
  
    var fancyNavbarTogglerIconTimeline = window.gsap.timeline().pause();
    var _fancyNavbarTogglerIcon2 = document.querySelector(Selector.FANCYNAVBAR_TOGGLER_ICON);
    var fancyNavbarTogglerIconPathTop = _fancyNavbarTogglerIcon2.querySelector(Selector.PATH_TOP);
    var fancyNavbarTogglerIconPathMiddle = _fancyNavbarTogglerIcon2.querySelector(Selector.PATH_MIDDLE);
    var fancyNavbarTogglerIconPathBottom = _fancyNavbarTogglerIcon2.querySelector(Selector.PATH_BOTTOM);
    fancyNavbarTogglerIconTimeline.fromTo(fancyNavbarTogglerIconPathTop, 0.5, {
      'stroke-dashoffset': '0',
      'stroke-dasharray': '30px 88px'
    }, {
      'stroke-dashoffset': '-81px',
      delay: 0,
      ease: EASE
    }, 0).fromTo(fancyNavbarTogglerIconPathMiddle, 0.5, {
      'stroke-dashoffset': '0',
      'stroke-dasharray': '30px 30px'
    }, {
      'stroke-dashoffset': '-15px',
      'stroke-dasharray': '0.1px 30px',
      delay: 0,
      ease: EASE
    }, 0).fromTo(fancyNavbarTogglerIconPathBottom, 0.5, {
      'stroke-dashoffset': '-87.9px',
      'stroke-dasharray': '30px 88.1px'
    }, {
      'stroke-dashoffset': '-6.3px',
      delay: 0,
      ease: EASE
    }, 0);
   
    //  End of Fancy Navbar Toggler Icon Animation
 

    var animateMenu = function animateMenu() {
      _fancyNavbarTogglerIcon2.classList.contains(ClassName.PLAY) ? fancyNavbarTogglerIconTimeline.reverse() : fancyNavbarTogglerIconTimeline.play();
      _fancyNavbarTogglerIcon2.classList.toggle(ClassName.PLAY);
      fancyNavbarToggler.classList.contains(ClassName.COLLAPSED) ? fancyNavbarCollapseTimeline.reverse() : fancyNavbarCollapseTimeline.play();
      fancyNavbarToggler.classList.toggle(ClassName.COLLAPSED);
    };
    fancyNavbarToggler.addEventListener(Events.CLICK, animateMenu);
    document.querySelector('main').addEventListener(Events.CLICK, function () {
      fancyNavbarToggler.classList.contains(ClassName.COLLAPSED) && animateMenu();
    });

  
    //  Resize Fancy Dropdown
  
    var fancyDropdownMenus = document.querySelectorAll(Selector.FANCY_DROPDOWN_MENU);
    if (fancyDropdownMenus.length) {
      fancyDropdownMenus.forEach(function (el) {
        var fancyDropdownMenu = el;
        var dpMenuPrevSiblingHeight = "".concat(fancyDropdownMenu.previousElementSibling.offsetHeight, "px");
        fancyDropdownMenu.closest(Selector.FANCY_DROPDOWN).style.height = dpMenuPrevSiblingHeight;
      });

   
    //   On Resize, Adjust the Menu Height
   
      window.resize(function () {
        var fancyDropdownList = document.querySelectorAll(Selector.FANCY_DROPDOWN);
        fancyDropdownList.forEach(function (el) {
          var fancyDropdown = el;
          var dropdownToggleHeight = el.querySelector(Selector.FANCY_DROPDOWN_TOGGLE).offsetHeight;
          if (fancyDropdown.classList.contains(ClassName.SHOW)) {
            var fancyDropdownMenuHeight = fancyDropdown.querySelector(Selector.FANCY_DROPDOWN_MENU).offsetHeight;
            fancyDropdown.style.height = "".concat(dropdownToggleHeight + fancyDropdownMenuHeight, "px");
          } else {
            fancyDropdown.style.height = "".concat(dropdownToggleHeight, "px");
          }
        });
      });
    }
  
    //   End of Resize Fancy Dropdown



  
    //dropdown section

    var fancyNavLinks = document.querySelectorAll(Selector.FANCYNAV_LINK);
    fancyNavLinks.forEach(function (fancyNavLink) {
      fancyNavLink.addEventListener(Events.CLICK, function (e) {
        var fancyLink = e.target;
        // if one-page
        if (fancyLink.closest(Selector.DATA_ONE_PAGE)) {
          animateMenu();
        } else {
          var _targetFancyLinkParen;
          var fancyDropdownMenuTl = window.gsap.timeline().pause();
          var targetFancyLink = fancyLink.closest(Selector.FANCY_DROPDOWN_TOGGLE);
          var targetNavSiblings = targetFancyLink === null || targetFancyLink === void 0 ? void 0 : targetFancyLink.nextElementSibling;
          var siblingsList = targetNavSiblings === null || targetNavSiblings === void 0 ? void 0 : targetNavSiblings.querySelectorAll(Selector.FANCY_DROPDOWN_ITEM);
          var listOfItems = Array.from(siblingsList);
          fancyDropdownMenuTl.staggerFromTo(listOfItems, 0.3, {
            y: 30,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            ease: EASE
          }, 0.01).delay(0.1);
          var targetFancyLinkParentLi = fancyLink === null || fancyLink === void 0 ? void 0 : fancyLink.closest(Selector.FANCY_DROPDOWN);
          targetFancyLinkParentLi === null || targetFancyLinkParentLi === void 0 || (_targetFancyLinkParen = targetFancyLinkParentLi.classList) === null || _targetFancyLinkParen === void 0 || _targetFancyLinkParen.toggle(ClassName.SHOW);
          if (fancyLink.closest(Selector.FANCY_DROPDOWN).classList.contains(ClassName.SHOW)) {
            targetFancyLinkParentLi.style.height = "".concat(targetFancyLink.offsetHeight + targetFancyLink.nextElementSibling.offsetHeight, "px");
            fancyDropdownMenuTl.play();
          } else {
            fancyDropdownMenuTl.reverse();
            targetFancyLinkParentLi.style.height = "".concat(targetFancyLink.offsetHeight, "px");
          }

        }
      });
    }); 
  } 
  
};



// link animation
docReady(fancyNavInit);