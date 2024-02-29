const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
   
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
      if(select.name ==="from" && currCode ==="USD"){
        newOption.selected = "selected";
      }
      else if(select.name ==="to" && currCode ==="INR"){
        newOption.selected = "selected";
      }



        select.append(newOption);


    }
  select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
  })

}

const updateFlag = (element) =>{
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
     img.src = newSrc;
}


const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ===""  || amtVal < 1){
        amtVal = 1;
        amtVal = "1";
    }
    console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",() =>{
    updateExchangeRate();
})




















/*const URL="https://cat-fact.herokuapp.com/facts";
const factPara = document.querySelector("#fact");
const btn = document.querySelector("#btn");


const getFacts = async () =>{
    console.log("Getting data.....")
    let response = await fetch(URL)
    console.log(response);
    let data = await response.json();
   factPara.innerText = data[1].text

}
btn.addEventListener("click",getFacts);




/*function gatData(dataId){
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
       console.log("data ",dataId)
       resolve("success");
        },3000)
    })
}
async function getAllData(){
    console.log("getting data1 ......")
    await gatData(1);
    console.log("getting data2 ......")
    await gatData(2);
    console.log("getting data3 ......")
    await gatData(3);
    console.log("getting data4 ......")
    await gatData(4);
}

(async function (){
    console.log("getting data1 ......")
    await gatData(1);
    console.log("getting data2 ......")
    await gatData(2);
    console.log("getting data3 ......")
    await gatData(3);
    console.log("getting data4 ......")
    await gatData(4);
})();

/*gatData(1).then((res) =>{
    console.log(res);
   return gatData(2)
}).then((res) =>{
    return gatData(3);
}).then((res) =>{
    console.log(res);
});





/*function ayncFunc1(){
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
       console.log("data1");
       resolve("success")
        },4000);
    })
}
function ayncFunc2(){
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
       console.log("data2");
       resolve("success")
        },4000);
    })
}

console.log("Fetching data1")
ayncFunc1().then((res) =>{
    console.log("Fetching data2")
ayncFunc2().then((res) =>{});

});



/*const getpromise = () =>{
 return new Promise((resolve,reject) =>{
    console.log("I am a promise");
    resolve("success")
   // reject("network error")
})
};
let promise = getpromise();
promise.then((res) =>{
    console.log("promise fulfilled",res);
})
promise.catch((err) =>{
    console.log("Rejected",err)
})
/*function gatData(dataId,getNextData){
    return new Promise((resolve,reject) =>{
   setTimeout(() =>{
     console.log("Data is",dataId);
    // resolve("succccesss");
    reject("some error occured");
     if(getNextData)
     getNextData();
   },5000)
    });
}
*/





















/*function gatData(dataId,getNextData){
    setTimeout(() =>{
        console.log("data is",dataId);
        if(getNextData)
        getNextData ();
    },3000);
}
//callback hell
gatData(122,() =>{
    gatData(4, () =>{
        gatData(8, () =>{
            gatData(6)
        });
    });
});
*/
