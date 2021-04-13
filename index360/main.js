(function () {
   let originalPositions = [];
   let daElements = document.querySelectorAll('[data-da]');
   let daElementsArray = [];
   let daMatchMedia = [];

   if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
         const daElement = daElements[index];
         const daMove = daElement.getAttribute('data-da');
         if (daMove != '') {
            const daArray = daMove.split(',');
            const daPlace = daArray[1] ? daArray[1].trim() : 'last';
            const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
            const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
            const daDestination = document.querySelector(
               '.' + daArray[0].trim()
            );
            if (daArray.length > 0 && daDestination) {
               daElement.setAttribute('data-da-index', number);
               originalPositions[number] = {
                  parent: daElement.parentNode,
                  index: indexInParent(daElement),
               };
               daElementsArray[number] = {
                  element: daElement,
                  destination: document.querySelector('.' + daArray[0].trim()),
                  place: daPlace,
                  breakpoint: daBreakpoint,
                  type: daType,
               };
               number++;
            }
         }
      }
      dynamicAdaptSort(daElementsArray);

      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daBreakpoint = el.breakpoint;
         const daType = el.type;

         daMatchMedia.push(
            window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)')
         );
         daMatchMedia[index].addListener(dynamicAdapt);
      }
   }

   function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daElement = el.element;
         const daDestination = el.destination;
         const daPlace = el.place;
         const daBreakpoint = el.breakpoint;
         const daClassname = '_dynamic_adapt_' + daBreakpoint;

         if (daMatchMedia[index].matches) {
            if (!daElement.classList.contains(daClassname)) {
               let actualIndex = indexOfElements(daDestination)[daPlace];
               if (daPlace === 'first') {
                  actualIndex = indexOfElements(daDestination)[0];
               } else if (daPlace === 'last') {
                  actualIndex = indexOfElements(daDestination)[
                     indexOfElements(daDestination).length
                  ];
               }
               daDestination.insertBefore(
                  daElement,
                  daDestination.children[actualIndex]
               );
               daElement.classList.add(daClassname);
            }
         } else {
            if (daElement.classList.contains(daClassname)) {
               dynamicAdaptBack(daElement);
               daElement.classList.remove(daClassname);
            }
         }
      }
   }

   dynamicAdapt();

   function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
   }

   function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
   }

   function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
         const childrenElement = children[i];
         if (back) {
            childrenArray.push(i);
         } else {
            if (childrenElement.getAttribute('data-da') == null) {
               childrenArray.push(i);
            }
         }
      }
      return childrenArray;
   }

   function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
         if (a.breakpoint > b.breakpoint) {
            return -1;
         } else {
            return 1;
         }
      });
      arr.sort(function (a, b) {
         if (a.place > b.place) {
            return 1;
         } else {
            return -1;
         }
      });
   }
})();

const config = {
   type: 'line',
   data: {
      labels: [
			'1	.2018',
			'2	.2018',
			'3	.2018',
			'4	.2018',
			'5	.2018',
			'6	.2018',
			'7	.2018',
			'8	.2018',
			'9	.2018',
			'10.2018',
			'11.2018',
			'12.2018',
			'13.2018',
			'14.2018',
			'15.2018',
			'16.2018',
			'17.2018',
			'18.2018',
			'19.2018',
			'20.2018',
			'21.2018',
			'22.2018',
			'23.2018',
			'24.2018',
			'25.2018',
			'26.2018',
			'27.2018',
			'28.2018',
			'29.2018',
			'30.2018',
			'31.2018',
			'32.2018',
			'33.2018',
			'34.2018',
			'35.2018',
			'36.2018',
			'37.2018',
			'38.2018',
			'39.2018',
			'40.2018',
			'41.2018',
			'42.2018',
			'43.2018',
			'44.2018',
			'45.2018',
			'46.2018',
			'47.2018',
			'48.2018',
			'49.2018',
			'50.2018',
			'51.2018',
			'52.2018',
			'53.2018',
			'1.2019',
			'2.2019',
			'3.2019',
			'4.2019',
			'5.2019',
			'6.2019',
			'7.2019',
			'8.2019',
			'9.2019',
			'10.2019',
			'11.2019',
			'12.2019',
			'13.2019',
			'14.2019',
			'15.2019',
			'16.2019',
			'17.2019',
			'18.2019',
			'19.2019',
			'20.2019',
			'21.2019',
			'22.2019',
			'23.2019',
			'24.2019',
			'25.2019',
			'26.2019',
			'27.2019',
			'28.2019',
			'29.2019',
			'30.2019',
			'31.2019',
			'32.2019',
			'33.2019',
			'34.2019',
			'35.2019',
			'36.2019',
			'37.2019',
			'38.2019',
			'39.2019',
			'40.2019',
			'41.2019',
			'42.2019',
			'43.2019',
			'44.2019',
			'45.2019',
			'46.2019',
			'47.2019',
			'48.2019',
			'49.2019',
			'50.2019',
			'51.2019',
			'52.2019',
			'1.2020',
			'2.2020',
			'3.2020',
			'4.2020',
			'5.2020',
			'6.2020',
			'7.2020',
			'8.2020',
			'9.2020',
			'10.2020',
			'11.2020',
			'12.2020',
			'13.2020',
			'14.2020',
			'15.2020',
			'16.2020',
			'17.2020',
			'18.2020',
			'19.2020',
			'20.2020',
			'21.2020',
			'22.2020',
			'23.2020',
			'24.2020',
			'25.2020',
			'26.2020',
			'27.2020',
			'28.2020',
			'29.2020',
			'30.2020',
			'31.2020',
			'32.2020',
			'33.2020',
			'34.2020',
			'35.2020',
			'36.2020',
			'37.2020',
			'38.2020',
			'39.2020',
			'40.2020',
			'41.2020',
			'42.2020',
			'43.2020',
			'44.2020',
			'45.2020',
			'46.2020',
			'47.2020',
			'48.2020',
			'49.2020',
			'50.2020',
			'51.2020',
			'52.2020',
			'1.2021',
		'2.2021',
		'3.2021',
		'4.2021',
		'5.2021',
		'6.2021',
		'7.2021',
		'8.2021',
		'9.2021',
		'10.2021',
			'11.2021',
			'12.2021'
			],
      datasets: [
         {
            label: 'Доля продаж безналичным способом оплаты, %',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [44.22,
					47.17,
					48.60,
					48.00,
					46.28,
					47.27,
					47.55,
					48.28,
					47.92,
					47.19,
					47.63,
					48.28,
					46.14,
					44.99,
					46.77,
					45.83,
					45.57,
					43.79,
					44.50,
					45.65,
					44.79,
					43.13,
					43.64,
					44.39,
					44.85,
					44.04,
					42.77,
					44.22,
					44.40,
					43.77,
					42.62,
					43.51,
					43.86,
					43.95,
					42.30,
					41.96,
					42.66,
					43.82,
					43.96,
					42.18,
					43.36,
					43.94,
					43.62,
					42.12,
					43.21,
					44.09,
					45.48,
					43.56,
					43.73,
					45.84,
					46.36,
					45.27,
					43.20,
					44.71,
					45.87,
					45.44,
					43.79,
					44.25,
					44.96,
					45.11,
					44.59,
					44.92,
					44.44,
					44.83,
					43.81,
					42.65,
					43.57,
					44.30,
					43.14,
					43.16,
					42.89,
					43.05,
					43.89,
					41.22,
					41.57,
					43.31,
					43.64,
					43.40,
					42.43,
					42.98,
					43.55,
					43.21,
					41.91,
					42.39,
					43.09,
					43.85,
					42.21,
					41.47,
					43.36,
					44.25,
					43.41,
					42.29,
					43.67,
					44.44,
					44.29,
					43.16,
					44.59,
					43.98,
					44.87,
					45.12,
					44.07,
					45.88,
					46.37,
					46.55,
					44.93,
					45.57,
					45.83,
					46.38,
					44.67,
					44.66,
					46.99,
					46.83,
					46.12,
					45.56,
					46.66,
					47.74,
					46.75,
					45.65,
					47.46,
					48.53,
					49.60,
					47.67,
					47.35,
					48.09,
					48.56,
					47.86,
					46.70,
					47.94,
					48.27,
					47.84,
					46.58,
					46.54,
					47.17,
					47.20,
					45.57,
					44.91,
					44.97,
					46.20,
					45.28,
					42.74,
					45.15,
					46.38,
					46.05,
					44.45,
					44.79,
					45.86,
					47.07,
					44.87,
					44.49,
					47.61,
					48.17,
					47.95,
					46.41,
					48.71,
					50.06,
					50.47,
					47.63,
					49.87,
					49.10,
					50.45,
					48.73,
					47.70,
					50.14,
					50.48,
					49.20,
					48.01,
					47.88,
					48.59,
					47.52,
					]
         },
      ],
   },
   options: {},
};

var myChart = new Chart(document.getElementById('myChart'), config);
