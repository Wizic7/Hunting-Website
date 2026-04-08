import { RegionData } from "./regionInfo.mjs";
import { animalTemplete } from "./templates.mjs";

init();

function init()
{
    let region = getRegion(getParams("Region"));
    console.log(region);
    document.querySelector("title").innerHTML= "Hunting in " + region.Name;
    document.querySelector(".welcome").innerHTML = "Welcome to the " + region.Name + " region";
    const htmlToInsert = region.Animals.map(animalTemplete);
    document.querySelector(".animal-flex").innerHTML = htmlToInsert.join("");
}

function getRegion(searchRegion)
{
    let returnData = RegionData[0];
    RegionData.forEach(data => {
        if(data.Name == searchRegion)
        {
           returnData = data;
        }
    });
    return returnData;
}

function getParams(param)
{
    const paramString = window.location.search;
    const param_list = new URLSearchParams(paramString);
    return param_list.get(param);
}