(function (angular) {
    var velocityFn = (window.$) ? window.$.Velocity : window.Velocity;
    angular.module('angular.collapse').directive('animateCollapse', function () {
        return {
            link: function (scope, element, attrs) {
                var collapsed = false,
                    isInit    = true,
                    classes = {
                        collapsing: 'animate-collapsing',
                        collapseIn: 'collapse-in',
                        collapse: 'animate-collapse'
                    };

                function expand() {
                    element.removeClass(classes.collapse);
                    element.addClass(classes.collapseIn);
                    element.addClass(classes.collapsing);
                    velocityFn(
                        element,
                        {height: element[0].scrollHeight, opacity: 1},
                        {duration: 200, queue: false, complete: collapseDone}
                    );
                }

                function collapse() {
                    element.css({height: element[0].scrollHeight + 'px', opacity: 1});
                    element.removeClass(classes.collapseIn);
                    element.addClass(classes.collapsing);
                    velocityFn(
                        element,
                        {height: 0, opacity: 0},
                        {duration: 200, queue: false, complete: collapseDone}
                    );
                }

                function collapseDone() {
                    if (collapsed) {
                        element.css({height: 0});
                        element.addClass(classes.collapse);
                    } else {
                        element.css({height: 'auto'});
                    }
                    element.removeClass(classes.collapsing);
                }

                scope.$watch(attrs.animateCollapse, function (shouldCollapse) {
                    collapsed = shouldCollapse;
                    if (isInit) {
                        isInit = false;
                        if (shouldCollapse) {
                            element.addClass(classes.collapse);
                            element.css({height: 0});
                        } else {
                            element.addClass(classes.collapseIn);
                            element.css({height: 'auto'});
                        }
                        return;
                    }
                    if (shouldCollapse) {
                        collapse();
                    } else {
                        expand();
                    }
                });
            }
        };
    });
}(window.angular));
