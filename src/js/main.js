const resultsLoc = document.querySelector(".results");
const branchesLoc = document.querySelector(".branches");
const jobFormLoc = document.querySelector(".job-form");
const jobTypeLoc = document.querySelector(".job-type");
const langLoc = document.querySelector(".lang");

const sliderOne = document.getElementById("slider-1");
const sliderTwo = document.getElementById("slider-2");
const displayValOne = document.getElementById("range1");
const displayValTwo = document.getElementById("range2");
const sliderTrack = document.querySelector(".slider-track");

const recNumLoc = document.querySelector(".records-number");

const searchBtn = document.querySelector(".search-btn");

const remoteLoc = document.querySelector("#remote");
const relocationLoc = document.querySelector("#relocation");
const salaryMarkLoc = document.querySelector("#salary-mark");
const salarySliderLoc = document.querySelector(".slider-container .container");
const salaryValuesLoc = document.querySelector(".values");
const salaryMinDotLoc = document.querySelector("#slider-1");
const salaryMaxDotLoc = document.querySelector("#slider-2");

const searchInputLoc = document.querySelector(".search-input input");

const clearFiltersLoc = document.querySelector(".clear-filters");
const clearFilterLoc = document.querySelectorAll(".lists .clear-list");
const noResultsLoc = document.querySelector(".no-results");

let apiPage = 1;
let apiDataLength = 0;

let filterBranchesList = [];
let filterJobFormList = [];
let filterjobTypeList = [];
let filterlangList = [];
let filterMinSalary = 100000;
let filterMaxSalary = 0;
let recordsNumber = 0;

let isEmpty = true;

let filterObj = {};

remoteLoc.checked = false;
relocationLoc.checked = false;

salaryMarkLoc.checked = false;
salaryMinDotLoc.disabled = true;
salaryMaxDotLoc.disabled = true;

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

const getAPI = (apiPage) => {
    return new Promise((resolve) => {
        resolve(
            fetch(
                "https://grupaprogres.traffit.com/public/job_posts/published",
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Request-Page-Size": "100",
                        "X-Request-Current-Page": apiPage,
                        "X-Request-Sort":
                            '{"sort_by": "id", "direction": "ASC"}',
                    },
                }
            )
        );
    });
};

const getAPIJSON = (apiData) => {
    return new Promise((resolve) => {
        resolve(apiData.json());
    });
};

const getAPIJSONLen = (apiDataJSON) => {
    return new Promise((resolve) => {
        resolve({ apiArray: apiDataJSON, apiArrayLen: apiDataJSON.length });
    });
};

const getAPIPage = (apiPage, filterObj) => {
    getAPI(apiPage)
        .then((apiData) => {
            return getAPIJSON(apiData);
        })

        .then((apiDataJSON) => {
            return getAPIJSONLen(apiDataJSON);
        })

        .then((fetchObj) => {
            apiDataLength = fetchObj.apiArrayLen;
            if (apiDataLength > 0) {
                if (apiPage === 1) {
                    resultsLoc.replaceChildren();
                    // recNumLoc.replaceChildren();
                    recordsNumber = 0;
                }

                showDataInHtml(fetchObj.apiArray, filterObj);
            } else {
                if (isEmpty) {
                    filterHTML(
                        filterBranchesList,
                        filterJobFormList,
                        filterjobTypeList,
                        filterlangList,
                        filterMinSalary,
                        filterMaxSalary
                    );
                }
                recNumLoc.innerText = `Znaleziono ${recordsNumber} ogłoszeń`;
                if (!recordsNumber) {
                    noResultsLoc.classList.add("active");
                } else {
                    noResultsLoc.classList.remove("active");
                }
            }
        });
};

getAPIPage(apiPage, filterObj);

// recordsNumber = 0;

const showDataInHtml = (apiData, filterObj) => {
    isEmpty = Object.keys(filterObj).length === 0;

    let parsedJobLocation;

    apiData.forEach(function (el) {
        if (isEmpty) {
            // branches filter

            if (
                filterBranchesList.findIndex(
                    (arr_el) => arr_el === el.options.branches
                ) === -1
            ) {
                filterBranchesList.push(el.options.branches);
            }

            // job form filter
            if (el.options._forma_zatrudnienia) {
                el.options._forma_zatrudnienia.forEach(function (elem) {
                    if (
                        filterJobFormList.findIndex(
                            (arr_el) => arr_el === elem
                        ) === -1
                    ) {
                        filterJobFormList.push(elem);
                    }
                });
            }

            // job type filter
            if (
                filterjobTypeList.findIndex(
                    (arr_el) => arr_el === el.options.job_type
                ) === -1
            ) {
                filterjobTypeList.push(el.options.job_type);
            }

            // lang filter
            if (
                filterlangList.findIndex(
                    (arr_el) => arr_el === el.advert.language
                ) === -1
            ) {
                filterlangList.push(el.advert.language);
            }

            //

            // salary filter
            if (parseInt(el.options._Widoczna_stawka)) {
                if (
                    parseInt(el.options._spodziewane_wynagrodzenie_od) <
                    filterMinSalary
                ) {
                    filterMinSalary = el.options._spodziewane_wynagrodzenie_od;
                }

                if (
                    parseInt(el.options._spodziewane_wynagrodzenie_do) >
                    filterMaxSalary
                ) {
                    filterMaxSalary = el.options._spodziewane_wynagrodzenie_do;
                }
            }
        } else {
            // activate branche filter
            if (filterObj.branchesFiltr.length) {
                if (
                    filterObj.branchesFiltr.indexOf(el.options.branches) === -1
                ) {
                    if (filterObj.branchesFiltr.length) {
                        return false;
                    }
                }
            }

            // activate jobForm filter
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

            // activate jobType filter
            if (filterObj.jobTypesFiltr.length) {
                if (
                    filterObj.jobTypesFiltr.indexOf(el.options.job_type) === -1
                ) {
                    if (filterObj.jobTypesFiltr.length) {
                        return false;
                    }
                }
            }

            // activate lang filter
            if (filterObj.langsFiltr.length) {
                if (filterObj.langsFiltr.indexOf(el.advert.language) === -1) {
                    if (filterObj.langsFiltr.length) {
                        return false;
                    }
                }
            }

            // activate remote filter
            if (filterObj.remoteFiltr) {
                if (!el.options.remote) {
                    return false;
                }
            }

            // activate relocation filter
            if (filterObj.relocationFiltr) {
                if (!el.options._relokacja) {
                    return false;
                }
            }

            // activate salary filter
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

            // search text
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
        }

        // records
        recordsNumber++;

        if (el.options.job_location) {
            parsedJobLocation = JSON.parse(el.options.job_location);
        }

        let formaZatrudnienia = "";

        if (el.options._forma_zatrudnienia) {
            el.options._forma_zatrudnienia.forEach(function (elem) {
                formaZatrudnienia = formaZatrudnienia + "<p>" + elem + "</p>";
            });
        }

        // record Color

        let borderColorClass = "";
        let textColorClass = "";

        if (el.options._rekrutacja_rodzaj === "PT") {
            borderColorClass = "pt-border";
            textColorClass = "pt-text";
        }
        if (el.options._rekrutacja_rodzaj === "RS") {
            borderColorClass = "rs-border";
            textColorClass = "rs-text";
        }

        resultsLoc.insertAdjacentHTML(
            "beforeend",
            `<a href="${
                el.url
            }" target="_blank"><div class="result ${borderColorClass}">
                <div class="top">
                    <div class="top-left">
                        <div class="lang"><p>${el.advert.language}</p></div>
                        <div class="branche-name">
                            <div class="branche">${
                                el.options.branches ? el.options.branches : ""
                            }</div>
                            <div class="name ${textColorClass}">${
                el.advert.name
            }</div>
                        </div>
                    </div>
                    <div class="top-right">
                        ${
                            el.options.job_type
                                ? "<div class='jobtype'>" +
                                  el.options.job_type +
                                  "</div>"
                                : ""
                        }
                        ${
                            el.options._Widoczna_stawka
                                ? el.options._spodziewane_wynagrodzenie_od &&
                                  el.options._spodziewane_wynagrodzenie_do
                                    ? "<div class='salary'>" +
                                      el.options._spodziewane_wynagrodzenie_od +
                                      " - " +
                                      el.options._spodziewane_wynagrodzenie_do +
                                      "</div>"
                                    : ""
                                : ""
                        }
                    </div>
                </div>

                <div class="bottom">
                    <div class="bottom-left">
                        <div class="city"><img src="./img/location_dot.svg">${
                            parsedJobLocation.locality
                        }</div>
                        ${
                            el.options.remote
                                ? "<div class='remote'>remote</div>"
                                : ""
                        }
                        ${
                            el.options._relokacja
                                ? "<div class='relocation'>relocation</div>"
                                : ""
                        }
                    </div>
                        <div class="bottom-right">
                            <div class="employmentform">${formaZatrudnienia}</div>
                        </div>
                    </div>
                </div>

            </div></a>`
        );
    });

    getAPIPage(++apiPage, filterObj);
};

const filterHTML = (
    filterBranchesList,
    filterJobFormList,
    filterjobTypeList,
    filterlangList,
    filterMinSalary,
    filterMaxSalary
) => {
    if (filterBranchesList.length > 0) {
        filterBranchesList.sort();
        rowHeight = filterBranchesList.length * 21 + 3;
        branchesLoc.style.height = String(rowHeight) + "px";
        filterBranchesList.forEach(function (el) {
            branchesLoc.insertAdjacentHTML(
                "beforeend",
                `<option value="${el}">${el}</option>`
            );
        });
    }

    if (filterJobFormList.length > 0) {
        filterJobFormList.sort();
        rowHeight = filterJobFormList.length * 21 + 3;
        jobFormLoc.style.height = String(rowHeight) + "px";
        filterJobFormList.forEach(function (el) {
            jobFormLoc.insertAdjacentHTML(
                "beforeend",
                `<option value="${el}">${el}</option>`
            );
        });
    }

    if (filterjobTypeList.length > 0) {
        filterjobTypeList.sort();
        rowHeight = filterjobTypeList.length * 21 + 3;
        jobTypeLoc.style.height = String(rowHeight) + "px";
        filterjobTypeList.forEach(function (el) {
            jobTypeLoc.insertAdjacentHTML(
                "beforeend",
                `<option value="${el}">${el}</option>`
            );
        });
    }

    if (filterlangList.length > 0) {
        filterlangList.sort();
        rowHeight = filterlangList.length * 21 + 3;
        langLoc.style.height = String(rowHeight) + "px";
        filterlangList.forEach(function (el) {
            langLoc.insertAdjacentHTML(
                "beforeend",
                `<option value="${el}">${el}</option>`
            );
        });
    }
    sliderOne.value = filterMinSalary;
    sliderTwo.value = filterMaxSalary;
    sliderOne.min = filterMinSalary;
    sliderTwo.min = filterMinSalary;
    sliderOne.max = filterMaxSalary;
    sliderTwo.max = filterMaxSalary;
    slideOne();
    slideTwo();
};

// double range slider

let minGap = 0;

function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}

function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}

function fillColor() {
    percent1 =
        ((sliderOne.value - sliderOne.min) / (sliderOne.max - sliderOne.min)) *
        100;
    percent2 =
        ((sliderTwo.value - sliderOne.min) / (sliderOne.max - sliderOne.min)) *
        100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #fe7320ff ${percent1}%, #fe7320ff ${percent2}%, #dadae5 ${percent2}%)`;
}

slideOne();
slideTwo();

const getFilteredData = () => {
    const branchesChildrenLoc = document.querySelectorAll(".branches option");
    const jobFormChildrenLoc = document.querySelectorAll(".job-form option");
    const jobTypeChildrenLoc = document.querySelectorAll(".job-type option");
    const langChildrenLoc = document.querySelectorAll(".lang option");

    // create filter Obj

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

    let selectedRemote = remoteLoc.checked;
    let selectedRelocation = relocationLoc.checked;

    let selectedValOne;
    let selectedValTwo;
    if (salaryMarkLoc.checked) {
        selectedValOne = displayValOne.innerText;
        selectedValTwo = displayValTwo.innerText;
    }

    if (searchInputLoc.value !== "") {
    }

    filterObj.branchesFiltr = selectedBranches;
    filterObj.jobFormsFiltr = selectedJobForms;
    filterObj.jobTypesFiltr = selectedJobTypes;
    filterObj.langsFiltr = selectedLang;
    filterObj.remoteFiltr = selectedRemote;
    filterObj.relocationFiltr = selectedRelocation;
    filterObj.salary = [selectedValOne, selectedValTwo];
    filterObj.searchText = searchInputLoc.value;

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
