const resultsLoc = document.querySelector(".results");
const branchesLoc = document.querySelector(".branches");
const jobFormLoc = document.querySelector(".job-form");
const jobTypeLoc = document.querySelector(".job-type");
const langLoc = document.querySelector(".lang");
const countriesLoc = document.querySelector(".countries");
const citiesLoc = document.querySelector(".cities");

const sliderOne = document.getElementById("slider-1");
const sliderTwo = document.getElementById("slider-2");
const displayValOne = document.getElementById("range1");
const displayValTwo = document.getElementById("range2");
const sliderTrack = document.querySelector(".salary .slider-track");
const pauseLoc = document.querySelector(".salary .pause");

const recNumLoc = document.querySelector(".records-number");

const searchBtn = document.querySelector(".search-btn");

const remoteLoc = document.querySelector("#remote");
const relocationLoc = document.querySelector("#relocation");
const salaryMarkLoc = document.querySelector("#salary-mark");
const salarySliderLoc = document.querySelector(
    ".salary .slider-container .container"
);
const salaryValuesLoc = document.querySelector(".salary .slider-values");
const salaryMinDotLoc = document.querySelector("#slider-1");
const salaryMaxDotLoc = document.querySelector("#slider-2");

const searchInputLoc = document.querySelector(".search-input input");

const clearFiltersLoc = document.querySelector(".clear-filters");
const clearFilterLoc = document.querySelectorAll(".lists .clear-list");
const noResultsLoc = document.querySelector(".no-results");

const dropDownFilterLoc = document.querySelector(".drop-down-filters");
const dropDownLoc = document.querySelector(".drop-down-btn");
const dropDownBtnLoc = document.querySelector(".drop-down-btn img");
const moreFiltersLoc = document.querySelector(".more-filters");
const lessFiltersLoc = document.querySelector(".less-filters");

const locationMarkLoc = document.querySelector("#localization");
const locationSliderLoc = document.querySelector(
    ".distance-slider .slider-container .container"
);
const locationDotLoc = document.querySelector("#loc-slider");
const locationValuesLoc = document.querySelector(
    ".distance-slider .slider-values"
);
const displayValThree = document.getElementById("range3");

const recordsOnPageLoc = document.querySelectorAll(".recordsOnPage span");

const pagesContainerLoc = document.querySelector(".pages-container");
let pageButtonsLoc = document.querySelectorAll(".page");

let apiPage = 1;
let recordsOnPage = 20;
let apiDataLength = 0;
let i = 1;
let k = recordsOnPage;

let filterBranchesList = [];
let filterJobFormList = [];
let filterJobTypeList = [];
let filterLangList = [];
let filterMinSalary = 100000;
let filterMaxSalary = 0;
let filterCountriesList = {};

let recordsNumber = 0;

let isEmpty = true;

let filterObj = {};

let filterListMaxHeight = 0;

let allowSetPages = true;

// remoteLoc.checked = false;
// relocationLoc.checked = false;

// salaryMarkLoc.checked = false;
// salaryMinDotLoc.disabled = true;
// salaryMaxDotLoc.disabled = true;

salaryMarkLoc.addEventListener("change", function (e) {
    if (e.target.checked) {
        salarySliderLoc.classList.remove("unactive");
        salaryValuesLoc.classList.remove("unactive");
        salaryMinDotLoc.disabled = false;
        salaryMaxDotLoc.disabled = false;
    } else {
        salarySliderLoc.classList.add("unactive");
        salaryValuesLoc.classList.add("unactive");
        salaryMinDotLoc.disabled = true;
        salaryMaxDotLoc.disabled = true;
    }
});

// const getAPI = (apiPage) => {
//     return new Promise((resolve) => {
//         resolve(
//             fetch(
//                 "https://grupaprogres.traffit.com/public/job_posts/published",
//                 {
//                     mode: "cors",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "X-Request-Page-Size": "100",
//                         "X-Request-Current-Page": apiPage,
//                         "X-Request-Sort":
//                             '{"sort_by": "id", "direction": "ASC"}',
//                     },
//                 }
//             )
//         );
//     });
// };

// const getAPIJSON = (apiData) => {
//     return new Promise((resolve) => {
//         resolve(apiData.json());
//     });
// };

// const getAPIJSONLen = (apiDataJSON) => {
//     return new Promise((resolve) => {
//         resolve({ apiArray: apiDataJSON, apiArrayLen: apiDataJSON.length });
//     });
// };

const getAPIPage = (apiPage, filterObj) => {
    getAPI(apiPage)
        .then((apiData) => {
            return getAPIJSON(apiData);
        })

        .then((apiDataJSON) => {
            return getAPIJSONLen(apiDataJSON);
        })

        .then((fetchObj) => {
            // apiDataLength = fetchObj.apiArrayLen;
            // if (apiDataLength > 0) {
            //     if (apiPage === 1) {
            //         resultsLoc.replaceChildren();
            //         recordsNumber = 0;
            //     }
            //     showDataInHtml(fetchObj.apiArray, filterObj);
            // } else {
            //     if (isEmpty) {
            //         filterHTML(
            //             filterBranchesList,
            //             filterJobFormList,
            //             filterJobTypeList,
            //             filterLangList,
            //             filterMinSalary,
            //             filterMaxSalary
            //         );
            //     }
                // recNumLoc.innerText = `Znaleziono ${recordsNumber} ogłoszeń`;
                // if (!recordsNumber) {
                //     noResultsLoc.classList.add("active");
                // } else {
                //     noResultsLoc.classList.remove("active");
                // }

                // setPages(recordsNumber);

                // function compare(a, b) {
                //     return a.city.localeCompare(b.city);
                // }

                // for (let key in filterCountriesList) {
                //     filterCountriesList[key].sort(compare);
                // }
            }
        });
};

getAPIPage(apiPage, filterObj);

i = 1;

const showDataInHtml = (apiData, filterObj) => {
    isEmpty = Object.keys(filterObj).length === 0;

    let parsedJobLocation;

    apiData.forEach(function (el) {
        // convert specific location structure

        // console.log("All " + i);
        // console.log("All " + k);

        // if (el.options.job_location) {
        //     parsedJobLocation = JSON.parse(el.options.job_location);
        // }

        if (isEmpty) {
            // branches filter create (1 - create Array) ///////////////////////////////////////////////////////    1

            // if (
            //     filterBranchesList.findIndex(
            //         (arr_el) => arr_el === el.options.branches
            //     ) === -1
            // ) {
            //     filterBranchesList.push(el.options.branches);
            // }

            // // job form filter create
            // if (el.options._forma_zatrudnienia) {
            //     el.options._forma_zatrudnienia.forEach(function (elem) {
            //         if (
            //             filterJobFormList.findIndex(
            //                 (arr_el) => arr_el === elem
            //             ) === -1
            //         ) {
            //             filterJobFormList.push(elem);
            //         }
            //     });
            // }

            // // job type filter create
            // if (
            //     filterJobTypeList.findIndex(
            //         (arr_el) => arr_el === el.options.job_type
            //     ) === -1
            // ) {
            //     filterJobTypeList.push(el.options.job_type);
            // }

            // // lang filter create
            // if (
            //     filterLangList.findIndex(
            //         (arr_el) => arr_el === el.advert.language
            //     ) === -1
            // ) {
            //     filterLangList.push(el.advert.language);
            // }

            // // salary filter create
            // if (parseInt(el.options._Widoczna_stawka)) {
            //     if (
            //         parseInt(el.options._spodziewane_wynagrodzenie_od) <
            //         filterMinSalary
            //     ) {
            //         filterMinSalary = el.options._spodziewane_wynagrodzenie_od;
            //     }

            //     if (
            //         parseInt(el.options._spodziewane_wynagrodzenie_do) >
            //         filterMaxSalary
            //     ) {
            //         filterMaxSalary = el.options._spodziewane_wynagrodzenie_do;
            //     }
            // }

            // // countries & cities create
            // if (filterCountriesList[parsedJobLocation.country]) {
            //     if (
            //         filterCountriesList[parsedJobLocation.country].findIndex(
            //             (arr_el) => arr_el.city === parsedJobLocation.locality
            //         ) === -1
            //     ) {
            //         filterCountriesList[parsedJobLocation.country].push({
            //             city: parsedJobLocation.locality,
            //             lati: parseFloat(parsedJobLocation.latitude),
            //             longi: parseFloat(parsedJobLocation.longitude),
            //         });
            //     }
            // } else {
            //     filterCountriesList[parsedJobLocation.country] = [];
            //     filterCountriesList[parsedJobLocation.country].push({
            //         city: parsedJobLocation.locality,
            //         lati: parseFloat(parsedJobLocation.latitude),
            //         longi: parseFloat(parsedJobLocation.longitude),
            //     });
            // }
        } else {
            // branches filter apply (4 - download only selected data) /////////////////////////////////////////////////////  4
            if (filterObj.branchesFiltr.length) {
                if (
                    filterObj.branchesFiltr.indexOf(el.options.branches) === -1
                ) {
                    if (filterObj.branchesFiltr.length) {
                        return false;
                    }
                }
            }

            // jobForm filter apply
            if (filterObj.jobFormsFiltr.length) {
                let selectedJobFormsFiltr = false;

                if (el.options._forma_zatrudnienia) {
                    el.options._forma_zatrudnienia.forEach(function (elem) {
                        if (filterObj.jobFormsFiltr.length) {
                            if (filterObj.jobFormsFiltr.indexOf(elem) !== -1) {
                                selectedJobFormsFiltr = true;
                            }
                        }
                    });
                    if (!selectedJobFormsFiltr) {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            // jobType filter apply
            if (filterObj.jobTypesFiltr.length) {
                if (
                    filterObj.jobTypesFiltr.indexOf(el.options.job_type) === -1
                ) {
                    if (filterObj.jobTypesFiltr.length) {
                        return false;
                    }
                }
            }

            // lang filter apply
            if (filterObj.langsFiltr.length) {
                if (filterObj.langsFiltr.indexOf(el.advert.language) === -1) {
                    if (filterObj.langsFiltr.length) {
                        return false;
                    }
                }
            }

            // remote filter apply
            if (filterObj.remoteFiltr) {
                if (!el.options.remote) {
                    return false;
                }
            }

            // relocation filter apply
            if (filterObj.relocationFiltr) {
                if (!el.options._relokacja) {
                    return false;
                }
            }

            // salary filter apply
            if (filterObj.salary[0] || filterObj.salary[1]) {
                if (el.options._Widoczna_stawka == 1) {
                    if (
                        el.options._spodziewane_wynagrodzenie_od &&
                        el.options._spodziewane_wynagrodzenie_do
                    ) {
                        if (
                            filterObj.salary[0] <
                                el.options._spodziewane_wynagrodzenie_od &&
                            filterObj.salary[1] <
                                el.options._spodziewane_wynagrodzenie_od
                        ) {
                            return false;
                        }
                        if (
                            filterObj.salary[0] >
                                el.options._spodziewane_wynagrodzenie_do &&
                            filterObj.salary[1] >
                                el.options._spodziewane_wynagrodzenie_do
                        ) {
                            return false;
                        }
                    }

                    if (
                        el.options._spodziewane_wynagrodzenie_od &&
                        !el.options._spodziewane_wynagrodzenie_do
                    ) {
                        if (
                            filterObj.salary[0] <
                                el.options._spodziewane_wynagrodzenie_od &&
                            filterObj.salary[1] <
                                el.options._spodziewane_wynagrodzenie_od
                        ) {
                            return false;
                        }
                    }

                    if (
                        !el.options._spodziewane_wynagrodzenie_od &&
                        el.options._spodziewane_wynagrodzenie_do
                    ) {
                        if (
                            filterObj.salary[0] >
                                el.options._spodziewane_wynagrodzenie_do &&
                            filterObj.salary[1] >
                                el.options._spodziewane_wynagrodzenie_do
                        ) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }

            // search text apply
            if (filterObj.searchText) {
                let foundWord = false;
                let position = -1;
                el.advert.values.forEach(function (elem) {
                    if (elem.value && elem.field_id !== "geolocation") {
                        position = elem.value
                            .toLowerCase()
                            .search(filterObj.searchText.toLowerCase());
                        if (position !== -1) {
                            foundWord = true;
                        }
                    }
                });
                position = el.advert.name
                    .toLowerCase()
                    .search(filterObj.searchText.toLowerCase());
                if (position !== -1) {
                    foundWord = true;
                }
                if (!foundWord) {
                    return false;
                }
            }

            // countries filtr apply
            if (filterObj.countriesFiltr[0]) {
                if (
                    filterObj.countriesFiltr.indexOf(
                        parsedJobLocation.country
                    ) === -1
                ) {
                    if (parsedJobLocation.country) {
                        return false;
                    }
                }
            }

            // cities filtr apply
            if (filterObj.citiesFiltr[0]) {
                if (
                    filterObj.citiesFiltr.indexOf(
                        parsedJobLocation.locality
                    ) === -1
                ) {
                    if (parsedJobLocation.locality) {
                        // distance filtr apply

                        if (citiesLoc.value) {
                            let lati = parseFloat(parsedJobLocation.latitude);
                            let longi = parseFloat(parsedJobLocation.longitude);
                            let km = filterObj.distanceFiltr;

                            let min_lati = filterObj.latiFiltr - km * 0.009044;
                            let max_lati = filterObj.latiFiltr + km * 0.009044;
                            let min_longi =
                                filterObj.longiFiltr -
                                (km * 0.0089831) /
                                    Math.cos(
                                        (filterObj.latiFiltr * Math.PI) / 180
                                    );
                            let max_longi =
                                filterObj.longiFiltr +
                                (km * 0.0089831) /
                                    Math.cos(
                                        (filterObj.latiFiltr * Math.PI) / 180
                                    );
                            if (
                                lati > max_lati ||
                                lati < min_lati ||
                                longi > max_longi ||
                                longi < min_longi
                            ) {
                                return false;
                            }
                        }
                    }
                }
            }
        }

        // // records number counting
        // recordsNumber++;

        // colouring of records by type of recruitment

        // let borderColorClass = "";
        // let textColorClass = "";

        // if (el.options._rekrutacja_rodzaj === "PT") {
        //     borderColorClass = "pt-border";
        //     textColorClass = "pt-text";
        // }
        // if (el.options._rekrutacja_rodzaj === "RS") {
        //     borderColorClass = "rs-border";
        //     textColorClass = "rs-text";
        // }
        // if (el.options._rekrutacja_rodzaj === "WEW") {
        //     borderColorClass = "wew-border";
        //     textColorClass = "wew-text";
        // }

        // creating HTML code for record

        // let formaZatrudnienia = "";

        // if (el.options._forma_zatrudnienia) {
        //     el.options._forma_zatrudnienia.forEach(function (elem) {
        //         formaZatrudnienia = formaZatrudnienia + "<p>" + elem + "</p>";
        //     });
        // }

        // if (i <= k) {
        //     console.log("In cond " + i);
        //     console.log("In cond " + k);
            // resultsLoc.insertAdjacentHTML(
            //     "beforeend",
            //     `<a href="${
            //         el.url
            //     }" target="_blank"><div class="result ${borderColorClass}">
            //     <div class="top">
            //         <div class="top-left">
            //             <div class="lang"><p>${el.advert.language}</p></div>
            //             <div class="branche-name">
            //                 <div class="branche">${
            //                     el.options.branches ? el.options.branches : ""
            //                 }</div>
            //                 <div class="name ${textColorClass}">${
            //         el.advert.name
            //     }</div>
            //             </div>
            //         </div>
            //         <div class="top-right">
            //             ${
            //                 el.options.job_type
            //                     ? "<div class='jobtype'>" +
            //                       el.options.job_type +
            //                       "</div>"
            //                     : ""
            //             }
            //             ${
            //                 el.options._Widoczna_stawka
            //                     ? el.options._spodziewane_wynagrodzenie_od &&
            //                       el.options._spodziewane_wynagrodzenie_do
            //                         ? "<div class='salary'>" +
            //                           el.options._spodziewane_wynagrodzenie_od +
            //                           " - " +
            //                           el.options._spodziewane_wynagrodzenie_do +
            //                           "</div>"
            //                         : ""
            //                     : ""
            //             }
            //         </div>
            //     </div>

            //     <div class="bottom">
            //         <div class="bottom-left">
            //             <div class="city"><img src="./img/location_dot.svg">${
            //                 parsedJobLocation.locality
            //             }</div>
            //             ${
            //                 el.options.remote
            //                     ? "<div class='remote'>zdalna</div>"
            //                     : ""
            //             }
            //             ${
            //                 el.options._relokacja
            //                     ? "<div class='relocation'>relocation</div>"
            //                     : ""
            //             }
            //         </div>
            //             <div class="bottom-right">
            //                 <div class="employmentform">${formaZatrudnienia}</div>
            //             </div>
            //         </div>
            //     </div>

            // </div></a>`
            // );

            // console.log(i);
        // }
        // i++;
    // });

    // download next 100 records from API
    // getAPIPage(++apiPage, filterObj);
};

// fullfill filters lists
const filterHTML = () => {
    // fullfill branches filters list (2 - fullfill lists in HTML) ///////////////////////////////////////////////////////   2
    // if (filterBranchesList.length > 0) {
    //     filterBranchesList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterBranchesList.length * 21 + 3;
    //     filterListMaxHeight = rowHeight;
    //     branchesLoc.style.height = String(rowHeight) + "px";
    //     filterBranchesList.forEach(function (el) {
    //         branchesLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }
    // fullfill jobforms filters list
    // if (filterJobFormList.length > 0) {
    //     filterJobFormList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterJobFormList.length * 21 + 3;
    //     jobFormLoc.style.height = String(rowHeight) + "px";
    //     filterJobFormList.forEach(function (el) {
    //         jobFormLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }
    // fullfill jobtypes filters list
    // if (filterJobTypeList.length > 0) {
    //     filterJobTypeList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterJobTypeList.length * 21 + 3;
    //     jobTypeLoc.style.height = String(rowHeight) + "px";
    //     filterJobTypeList.forEach(function (el) {
    //         jobTypeLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }
    // fullfill langs filters list
    // if (filterLangList.length > 0) {
    //     filterLangList.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });
    //     rowHeight = filterLangList.length * 21 + 3;
    //     langLoc.style.height = String(rowHeight) + "px";
    //     filterLangList.forEach(function (el) {
    //         langLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}">${el}</option>`
    //         );
    //     });
    // }
    // fullfill countries filters list
    // if (Object.keys(filterCountriesList).length > 0) {
    //     // sort keys (countries) in object
    //     const filterCountriesListSorted = Object.keys(filterCountriesList)
    //         .sort()
    //         .reduce((accumulator, key) => {
    //             accumulator[key] = filterCountriesList[key];
    //             return accumulator;
    //         }, {});

    //     countriesLoc.insertAdjacentHTML(
    //         "beforeend",
    //         `<option value="" class="placeholder">Państwo</option>`
    //     );

    //     let newAllCitiesObj = [];
    //     for (let klucz in filterCountriesListSorted) {
    //         countriesLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${klucz}">${klucz}</option>`
    //         );

    //         newAllCitiesObj = newAllCitiesObj.concat(
    //             filterCountriesListSorted[klucz]
    //         );
    //     }

    //     let newAllCitiesArray = [];
    //     newAllCitiesObj.forEach((el) => {
    //         newAllCitiesArray.push(el.city);
    //     });

    //     newAllCitiesArray.sort(function (a, b) {
    //         return a.localeCompare(b);
    //     });

    //     citiesLoc.insertAdjacentHTML(
    //         "beforeend",
    //         `<option value="" class="placeholder">Miasto</option>`
    //     );

    //     newAllCitiesArray.forEach(function (el) {
    //         citiesLoc.insertAdjacentHTML(
    //             "beforeend",
    //             `<option value="${el}" class="active">${el} </option>`
    //         );
    //     });
    // }

    Object.keys(filterObj).length === 0;

//     sliderOne.value = filterMinSalary;
//     sliderTwo.value = filterMaxSalary;
//     sliderOne.min = filterMinSalary;
//     sliderTwo.min = filterMinSalary;
//     sliderOne.max = filterMaxSalary;
//     sliderTwo.max = filterMaxSalary;
//     slideOne();
//     slideTwo();
// };

// double range slider

// let minGap = 0;

// function slideOne() {
//     if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
//         sliderOne.value = parseInt(sliderTwo.value) - minGap;
//     }
//     displayValOne.textContent = sliderOne.value;

//     fillColor();
// }

// function slideTwo() {
//     if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
//         sliderTwo.value = parseInt(sliderOne.value) + minGap;
//     }
//     displayValTwo.textContent = sliderTwo.value;
//     if (displayValOne.textContent === "100000") {
//         salaryMarkLoc.disabled = true;
//         displayValOne.textContent = "";
//         displayValTwo.textContent = "";
//         pauseLoc.textContent = "";
//     }
//     fillColor();
// }

// function fillColor() {
//     percent1 =
//         ((sliderOne.value - sliderOne.min) / (sliderOne.max - sliderOne.min)) *
//         100;
//     percent2 =
//         ((sliderTwo.value - sliderOne.min) / (sliderOne.max - sliderOne.min)) *
//         100;
//     sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #fe7320ff ${percent1}%, #fe7320ff ${percent2}%, #dadae5 ${percent2}%)`;
// }

// slideOne();
// slideTwo();

const getFilteredData = () => {
    const branchesChildrenLoc = document.querySelectorAll(".branches option");
    const jobFormChildrenLoc = document.querySelectorAll(".job-form option");
    const jobTypeChildrenLoc = document.querySelectorAll(".job-type option");
    const langChildrenLoc = document.querySelectorAll(".lang option");
    const countriesChildrenLoc = document.querySelectorAll(".countries option");
    const citiesChildrenLoc = document.querySelectorAll(".cities option");

    // create filter Object (3 - put selected options to Object) ///////////////////////////////////////////////////////   3

    // i = 1;
    // k = recordsOnPage;

    filterObj = {};

    let selectedBranches = Array.from(branchesChildrenLoc)
        .filter(function (elem) {
            return elem.selected;
        })
        .map(function (elem) {
            return elem.value;
        });
    let selectedJobForms = Array.from(jobFormChildrenLoc)
        .filter(function (elem) {
            return elem.selected;
        })
        .map(function (elem) {
            return elem.value;
        });

    let selectedJobTypes = Array.from(jobTypeChildrenLoc)
        .filter(function (elem) {
            return elem.selected;
        })
        .map(function (elem) {
            return elem.value;
        });

    let selectedLang = Array.from(langChildrenLoc)
        .filter(function (elem) {
            return elem.selected;
        })
        .map(function (elem) {
            return elem.value;
        });

    let selectedCountry = [];
    if (locationMarkLoc.checked) {
        selectedCountry = Array.from(countriesChildrenLoc)
            .filter(function (elem) {
                return elem.selected;
            })
            .map(function (elem) {
                return elem.value;
            });
    }

    let selectedCity = [];
    if (locationMarkLoc.checked) {
        selectedCity = Array.from(citiesChildrenLoc)
            .filter(function (elem) {
                return elem.selected;
            })
            .map(function (elem) {
                return elem.value;
            });
    }

    let selectedLati;
    let selectedLongi;
    if (selectedCity[0]) {
        selectedLati = filterCountriesList[selectedCountry[0]].find(
            (el) => el.city === selectedCity[0]
        ).lati;

        selectedLongi = filterCountriesList[selectedCountry[0]].find(
            (el) => el.city === selectedCity[0]
        ).longi;
    }

    let selectedDistance = 0;
    if (locationMarkLoc.checked) {
        selectedDistance = parseInt(locationDotLoc.value);
    }

    let selectedRemote = remoteLoc.checked;
    let selectedRelocation = relocationLoc.checked;

    let selectedValOne;
    let selectedValTwo;
    if (salaryMarkLoc.checked) {
        selectedValOne = displayValOne.innerText;
        selectedValTwo = displayValTwo.innerText;
    }

    filterObj.branchesFiltr = selectedBranches;
    filterObj.jobFormsFiltr = selectedJobForms;
    filterObj.jobTypesFiltr = selectedJobTypes;
    filterObj.langsFiltr = selectedLang;
    filterObj.remoteFiltr = selectedRemote;
    filterObj.relocationFiltr = selectedRelocation;
    filterObj.salary = [selectedValOne, selectedValTwo];
    filterObj.searchText = searchInputLoc.value;
    filterObj.countriesFiltr = selectedCountry;
    filterObj.citiesFiltr = selectedCity;
    filterObj.distanceFiltr = selectedDistance;
    filterObj.latiFiltr = selectedLati;
    filterObj.longiFiltr = selectedLongi;

    // reset initialvalue
    apiPage = 1;
    apiDataLength = 0;
    recordsNumber = 0;
    getAPIPage(apiPage, filterObj);
};

searchBtn.addEventListener("click", getFilteredData);

const clearFilters = () => {
    searchInputLoc.value = "";
    window.location.reload();
};

clearFiltersLoc.addEventListener("click", clearFilters);

clearFilterLoc.forEach((elemFiltr) => {
    elemFiltr.addEventListener("click", () => {
        let optArray =
            elemFiltr.previousElementSibling.querySelectorAll("option");
        optArray.forEach((elOpt) => {
            if (elOpt.selected) {
                elOpt.selected = false;
            }
        });
    });
});

// dropDownLoc.addEventListener("click", () => {
//     dropDownBtnLoc.classList.toggle("up");
//     if (dropDownFilterLoc.classList.contains("show")) {
//         dropDownFilterLoc.classList.remove("show");
//         dropDownFilterLoc.style.maxHeight = String(0) + "px";
//         moreFiltersLoc.classList.remove("hide");
//         lessFiltersLoc.classList.remove("show");
//     } else {
//         dropDownFilterLoc.classList.add("show");
//         dropDownFilterLoc.style.maxHeight =
//             String(filterListMaxHeight + 200) + "px";
//         moreFiltersLoc.classList.add("hide");
//         lessFiltersLoc.classList.add("show");
//     }
// });

// locationMarkLoc.checked = false;
// locationDotLoc.disabled = true;
// countriesLoc.disabled = true;
// citiesLoc.disabled = true;

// locationMarkLoc.addEventListener("change", function (e) {
//     if (e.target.checked) {
//         if (citiesLoc.value) {
//             locationSliderLoc.classList.remove("unactive");
//             locationValuesLoc.classList.remove("unactive");
//             locationDotLoc.disabled = false;
//         }

//         countriesLoc.disabled = false;
//         citiesLoc.disabled = false;
//     } else {
//         locationSliderLoc.classList.add("unactive");
//         locationValuesLoc.classList.add("unactive");
//         locationDotLoc.disabled = true;

//         countriesLoc.disabled = true;
//         citiesLoc.disabled = true;
//     }
// });

// function slideThree() {
//     displayValThree.textContent = locationDotLoc.value;
// }

// locationDotLoc.value = 0;

// const activateCities = () => {
//     citiesLoc.querySelectorAll("option").forEach((el) => {
//         if (countriesLoc.value) {
//             if (
//                 filterCountriesList[countriesLoc.value].findIndex(
//                     (sel_el) => sel_el.city === el.value
//                 ) !== -1
//             ) {
//                 el.classList.add("active");
//             } else {
//                 el.classList.remove("active");
//             }
//         } else {
//             el.classList.add("active");
//         }
//     });
// };

// countriesLoc.addEventListener("change", function () {
//     activateCities();

//     if (countriesLoc.value) {
//         if (
//             filterCountriesList[countriesLoc.value].find(
//                 (el) => el.city !== citiesLoc.value
//             )
//         ) {
//             citiesLoc.value = filterCountriesList[countriesLoc.value][0].city;
//             locationSliderLoc.classList.remove("unactive");
//             locationValuesLoc.classList.remove("unactive");
//             locationDotLoc.disabled = false;
//         }
//     } else {
//         citiesLoc.value = citiesLoc[0].value;
//         locationSliderLoc.classList.add("unactive");
//         locationValuesLoc.classList.add("unactive");
//         locationDotLoc.disabled = true;
//     }
// });

// citiesLoc.addEventListener("change", function () {
//     Object.keys(filterCountriesList).find((key) => {
//         if (
//             filterCountriesList[key].findIndex(
//                 (sel_el) => sel_el.city === citiesLoc.value
//             ) !== -1
//         ) {
//             if (countriesLoc.value !== key) {
//                 countriesLoc.value = key;
//                 activateCities();
//             }
//         }
//     });
//     if (!citiesLoc.value) {
//         locationSliderLoc.classList.add("unactive");
//         locationValuesLoc.classList.add("unactive");
//         locationDotLoc.disabled = true;
//     } else {
//         locationSliderLoc.classList.remove("unactive");
//         locationValuesLoc.classList.remove("unactive");
//         locationDotLoc.disabled = false;
//     }
// });

recordsOnPageLoc.forEach((el) => {
    // el.addEventListener("click", (e) => {
    //     recordsOnPageLoc.forEach((elem) => {
    //         elem.classList.remove("active");
    //     });
    //     document
    //         .querySelector(`[data-value='${e.target.dataset.value}']`)
    //         .classList.add("active");

    //     recordsOnPage = parseInt(e.target.dataset.value);
    //     allowSetPages = true;
    //     i = 1;
        getFilteredData();
    // });
});

// const changePage = (pageBtn) => {
//     pageButtonsLoc.forEach((el) => {
//         el.classList.remove("active");
//     });
//     pageBtn.classList.add("active");
//     // console.log(parseInt(pageBtn.innerText));
//     // console.log(recordsNumber);
//     // console.log(recordsOnPage);
//     // console.log("TEST");
//     i = recordsOnPage * (parseInt(pageBtn.innerText) - 1) + 1;
//     k = recordsOnPage * (parseInt(pageBtn.innerText) - 1) + recordsOnPage;
//     // console.log(i);
//     // console.log(k);
//     allowSetPages = false;

//     getFilteredData();
// };

// const setPages = (recordsNumber) => {
//     if (allowSetPages) {
//         const pagesQuantity = Math.ceil(recordsNumber / recordsOnPage);

//         pagesContainerLoc.replaceChildren();

//         for (n = 1; n <= pagesQuantity; n++) {
//             if (n === 1) {
//                 pagesContainerLoc.insertAdjacentHTML(
//                     "beforeend",
//                     `<div class="page active">${n}</div>`
//                 );
//             } else {
//                 pagesContainerLoc.insertAdjacentHTML(
//                     "beforeend",
//                     `<div class="page">${n}</div>`
//                 );
//             }
//         }

//         pageButtonsLoc = document.querySelectorAll(".page");
//         pageButtonsLoc.forEach((el) => {
//             el.addEventListener("click", () => {
//                 changePage(el);
//             });
//         });
//     }
// };
