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

let countData = {};
const request = new XMLHttpRequest();
request.open('GET', './countdata.json');
request.send();
request.onload = () => {
   countData = JSON.parse(request.response);
   getData(countData);
};

function getData(data) {
   // const numberOfChecks = document.getElementById('numberOfChecks');
   // numberOfChecks.innerHTML = countData.relationToLastWeekIndexNumberOfChecks;

   // const amountOfSales = document.getElementById('amountOfSales');
   // amountOfSales.innerHTML = countData.relationToLastWeekIndexAmountOfSales;

   let options1 = {
      series: [
         {
            name: 'Индекс розничного бизнеса (кол-во чеков), 2021',
            data: countData.indexNumberOfChecks,
         },
         {
            name: 'Индекс розничного бизнеса (кол-во чеков), 2022',
            data: countData.indexNumberOfChecks2022,
         },
      ],
      chart: {
         height: 350,
         type: 'area',
         zoom: {
            enabled: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      xaxis: {
         categories: countData.weekYear,
      },
      legend: {
         position: 'top',
      },
      // colors: [ "#30AA4B", "#E8464F" ]
   };

	let options2 = {
		series: [
			{
				name: 'Индекс розничного бизнеса (по сумме продаж), 2021',
				data: countData.indexAmountOfSales,
			},
			{
				name: 'Индекс розничного бизнеса (по сумме продаж), 2022',
				data: countData.indexAmountOfSales2022,
			},
		],
		chart: {
			height: 350,
			type: 'area',
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: countData.weekYear,
		},
		legend: {
			position: 'top',
		},
		// colors: [ "#30AA4B", "#E8464F" ]
	};

   let options3 = {
      series: [
         {
            name: 'Доля наличных, 2021',
            data: countData.shareOfCash,
         },
         {
				name: 'Доля безналичных, 2021',
            data: countData.shareOfNonCash,
         },
      ],
      chart: {
         type: 'bar',
         height: 350,
         stacked: true,
         stackType: '100%',
      },
      responsive: [
         {
            breakpoint: 480,
            options: {
               legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
               },
            },
         },
      ],
      xaxis: {
         categories: countData.weekYear,
      },
      fill: {
         opacity: 1,
      },
      legend: {
         position: 'top',
      },
      // colors: ["#466EB6", "#353746"]
   };

   let options4 = {
      series: [
         {
            
				name: 'Доля наличных, 2022',
				data: countData.shareOfCash2022,
         },
         {
            name: 'Доля безналичных, 2022',
            data: countData.shareOfNonCash2022,
         },
      ],
      chart: {
         type: 'bar',
         height: 350,
         stacked: true,
         stackType: '100%',
      },
      responsive: [
         {
            breakpoint: 480,
            options: {
               legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0,
               },
            },
         },
      ],
      xaxis: {
         categories: countData.weekYear2022,
      },
      fill: {
         opacity: 1,
      },
      legend: {
         position: 'top',
      },
      // colors: ["#466EB6", "#353746"]
   };
	
   let chart1 = new ApexCharts(document.getElementById('myChart1'), options1);
   chart1.render();
   let chart2 = new ApexCharts(document.getElementById('myChart2'), options2);
   chart2.render();
   let chart3 = new ApexCharts(document.getElementById('myChart3'), options3);
   chart3.render();
   let chart4 = new ApexCharts(document.getElementById('myChart4'), options4);
   chart4.render();
}

$(function () {
   $("a[href^='#']").click(function (event) {
      var target = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(target).offset().top - 54 }, 800);
      return false;
   });
});

document.addEventListener('DOMContentLoaded', function () {
   let form = document.getElementById('form');

   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);

      if (error === 0) {
         let response = await fetch('index.php', {
            method: 'POST',
            body: formData,
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            formData.reset();
         } else {
            form.reset();
            alert('Ошибка');
         }
      }

      function formValidate(form) {
         let error = 0;
         let formRequired = document.querySelectorAll('._required');

         for (let i = 0; i < formRequired.length; i++) {
            const input = formRequired[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
               if (emailTest(input)) {
                  formAddError(input);
                  error++;
               }
            } else if (
               input.getAttribute('type') === 'checkbox' &&
               input.checked === false
            ) {
               formAddError(input);
               error++;
            } else if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
         return error;
      }

      function formAddError(input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }

      function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }

      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
            input.value
         );
      }
   }
});

var tooltipTriggerList = [].slice.call(
   document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   return new bootstrap.Tooltip(tooltipTriggerEl);
});
