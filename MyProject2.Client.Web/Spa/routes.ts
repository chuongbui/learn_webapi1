// Durandal routing configuration
export var Routes =
[
    { route: ['home', ''], moduleId: 'Spa/Views/home', title: 'Home', nav: true },
    { route: 'help', moduleId: 'Spa/Views/help', nav: false },
    { route: 'CarsObject(/:Id)', moduleId: 'Spa/Views/_CarsObjectView', title: 'Cars Object', nav: false },
    { route: 'CarsList*splat', moduleId: 'Spa/Views/_CarsListView', title: 'Cars List', nav: true },
    // GENPOINT - generated code will be inserted here. DO NOT REMOVE this line!
];
