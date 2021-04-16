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

const countData = {
   weekYear: [
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
      '12.2021',
      '13.2021',
      '14.2021',
   ],
   indexNumberOfChecks: [
      '-0.13',
      '-0.08',
      '-0.05',
      '-0.05',
      '-0.09',
      '-0.09',
      '-0.03',
      '-0.02',
      '-0.01',
      '-0.12',
      '-0.06',
      '-0.05',
      '-0.07',
      '-0.02',
   ],
   indexAmountOfSales: [
      '-0.04',
      '0.03',
      '0.07',
      '0.12',
      '0.08',
      '0.12',
      '0.16',
      '0.17',
      '0.22',
      '0.03',
      '0.08',
      '0.05',
      '0.01',
      '0.06',
   ],
   shareOfCash: [
      '0.50',
      '0.51',
      '0.50',
      '0.51',
      '0.52',
      '0.50',
      '0.49',
      '0.51',
      '0.52',
      '0.52',
      '0.51',
      '0.52',
      '0.55',
      '0.54',
   ],
   shareOfNonCash: [
      '0.50',
      '0.49',
      '0.50',
      '0.49',
      '0.48',
      '0.50',
      '0.51',
      '0.49',
      '0.48',
      '0.48',
      '0.49',
      '0.48',
      '0.45',
      '0.46',
   ],
};

const config1 = {
   type: 'line',
   data: {
      labels: countData.weekYear,
      datasets: [
         {
            label: 'Индекс розничного бизнеса (кол-во чеков)',
            backgroundColor: '#E8464F',
            borderColor: '#E8464F',
            data: countData.indexNumberOfChecks,
         },
         {
            label: 'Индекс розничного бизнеса (по сумме продаж)',
            backgroundColor: '#30AA4B',
            borderColor: '#30AA4B',
            data: countData.indexAmountOfSales,
         },
      ],
   },
   options: {},
};
// const config2 = {
//    type: 'bar',
//    data: {
//       labels: countData.weekYear,
//       datasets: [
//          {
//             label: 'Доля наличных',
//             backgroundColor: '#466EB6',
//             borderColor: '#466EB6',
//             data: countData.shareOfCash,
//          },
//          {
//             label: 'Доля безналичных',
//             backgroundColor: '#353746',
//             borderColor: '#353746',
//             data: countData.shareOfNonCash,
//          },
//       ],
//    },
//    options: {},
// };

var options2 = {
	series: [{
	name: 'Доля наличных',
	data: countData.shareOfCash
 }, {
	name: 'Доля безналичных',
	data: countData.shareOfNonCash
 }],
	chart: {
	type: 'bar',
	height: 350,
	stacked: true,
	stackType: '100%'
 },
 responsive: [{
	breakpoint: 480,
	options: {
	  legend: {
		 position: 'bottom',
		 offsetX: -10,
		 offsetY: 0
	  }
	}
 }],
 xaxis: {
	categories: countData.weekYear,
 },
 fill: {
	opacity: 1
 },
 legend: {
	position: 'top'
 },
 };

 var chart2 = new ApexCharts(document.getElementById("myChart2"), options2);
 chart2.render();
// var myChart1 = new Chart(document.getElementById('myChart1'), config1);
// var myChart2 = new Chart(document.getElementById('myChart2'), config2);
var options1 = {
	series: [{
	name: 'Индекс розничного бизнеса (кол-во чеков)',
	data: countData.indexNumberOfChecks
 }, {
	name: 'Индекс розничного бизнеса (по сумме продаж)',
	data: countData.indexAmountOfSales
 }],
	chart: {
	height: 350,
	type: 'area',
	zoom: {
		enabled: false
	 }
 },
 dataLabels: {
	enabled: false
 },
//  stroke: {
	curve: 'straight',
//  },
 xaxis: {
	// type: 'datetime',
	categories: countData.weekYear
 },
 legend: {
	position: 'top'
 },
//  tooltip: {
// 	x: {
// 	  format: 'dd/MM/yy HH:mm'
// 	},
//  },
 };

 var chart1 = new ApexCharts(document.querySelector("#myChart1"), options1);
 chart1.render();

 $(function () {
   $('a[href^="#"]').click(function (event) {
      var target = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(target).offset().top - 54 }, 800);
      return false;
   });
});