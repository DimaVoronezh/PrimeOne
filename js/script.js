'use strict';
window.addEventListener('DOMContentLoaded', () => {
    ibg();
    initScreen();
    formPlaceholder();
    areInputFilled('.form');
    scrollUpArrow('.up_arrow');
    smoothScroll(document.querySelector('.header_menu a'));
    smoothScroll(document.querySelector('.header_menu a:nth-child(2)'));
    smoothScroll(document.querySelector('.header_menu a:nth-child(3)'));
    smoothScroll(document.querySelectorAll('.header_menu a:nth-child(1)')[1]);



    function smoothScroll(trigger) {
        let element = document.documentElement;
        let body = document.body;
        trigger.addEventListener('click', (e) => {
            let targetTo = document.querySelector(trigger.hash);
            e.preventDefault();
            let offsetTarget = targetTo.offsetTop;

            let timer = setInterval(() => {
                if (offsetTarget > element.scrollTop) {
                    element.scrollTop = element.scrollTop + 8;
                    body.scrollTop = body.scrollTop + 8;
                    if ((element.scrollTop || body.scrollTop) >= offsetTarget ||
                        element.scrollTop + element.clientHeight >= element.scrollHeight) {
                        clearInterval(timer);
                    }
                } else {
                    element.scrollTop = element.scrollTop - 8;
                    body.scrollTop = body.scrollTop - 8;
                    if ((element.scrollTop || body.scrollTop) <= offsetTarget) {
                        clearInterval(timer);
                    }
                }
            }, 1);
        });
    }


    function scrollUpArrow(triggerSel) {
        let trigger = document.querySelector(triggerSel);
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 300) {
                trigger.classList.add('active');
            } else {
                trigger.classList.remove('active');
            }
        });
        smoothScroll(trigger);

        /*Пометка об этом в learn.js*/
        trigger.addEventListener('mouseover', () => {
            trigger.style.transform = 'scale(1.4)';
        });
        trigger.addEventListener('mouseleave', () => {
            trigger.style.transform = 'scale(1)';
        });
        trigger.addEventListener('touchstart', () => {
            trigger.style.transform = 'scale(1.4)';
        });
        trigger.addEventListener('touchend', () => {
            setTimeout(() => {
                trigger.style.transform = 'scale(1)';
            }, 250)
        });
    }


    function areInputFilled(formSel) {
        let form = document.querySelector(formSel);

        form.addEventListener('submit', (e) => {
            let res = false;
            e.preventDefault();
            res = checkFilledInputs(formSel);
            if (res) {
                form.reset();
            }
        });

        function checkFilledInputs(formSel) {
            let inputs = document.querySelector(formSel).querySelectorAll('input[name=name], input[name=email]');
            let result = true;
            inputs.forEach(item => {
                item.addEventListener('input', (e) => {
                    if (e.target.value != '') {
                        e.target.style = '';
                    }
                });
                if (item.value == '') {
                    item.style.boxShadow = 'inset 0 0 0 2px red';
                    result = false;
                }
            })
            return result;
        }

    }


    function formPlaceholder() {
        let inputs = document.querySelectorAll('.form_input');
        inputs.forEach(item => {
            changePlaceholder(item);
        });

        function changePlaceholder(item) {
            let oldText = item.placeholder;
            item.addEventListener('focus', () => {
                item.placeholder = '';
            });
            item.addEventListener('blur', () => {
                item.placeholder = oldText;
            });
        }
    }


    function initScreen() {
        let body = document.querySelector('body');
        let _burger_ = document.querySelector('._menu_burger');
        let menuMain = document.querySelector('._menu_page');
        let _menu_ = document.querySelector('._menu_');
        _burger_.addEventListener('click', function () {
            _burger_.classList.toggle('active');
            _menu_.classList.toggle('active');
            body.classList.toggle('active');
        });
        window.addEventListener('resize', function () {
            burgerMenu();
        })
        burgerMenu();

        function burgerMenu() {
            let header = document.querySelector('.header');
            let prevMenu = document.querySelectorAll('.header_menu');
            let _menu_ = document.querySelector('._menu_');
            let langs = document.querySelector('.lang_list');
            let logo = document.querySelector('.header_logo');
            let ordering_online = document.querySelector('.ordering_online');
            let header_bot = document.querySelector('.header_bot');

            if (document.documentElement.offsetWidth < 650) {
                menuMain.style.display = 'block';
                header.before(menuMain);
                prevMenu.forEach(item => {
                    _menu_.append(item);
                    _menu_.prepend(langs);
                });
            } else if (document.documentElement.offsetWidth > 650 && header.querySelector('.header_menu') === null) {
                menuMain.style.display = 'none';
                prevMenu.forEach((item, i) => {
                    header_bot.append(item);
                    if (i == 1) {
                        item.before(logo);
                    }
                    _menu_.prepend(langs);
                });
                ordering_online.before(langs);
            }
        }
    }


    function ibg() {
        let ibg = document.querySelectorAll(".ibg");
        for (let i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img')) {
                ibg[i].style.backgroundImage = `url(${ibg[i].querySelector('img').getAttribute('src')})`;
            }
        }
    }


})