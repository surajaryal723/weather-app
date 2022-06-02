$("button").click(async(e) => {
    e.preventDefault();
    let searchTerm = document.querySelector(".search").elements.q.value;

    try {
        let res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=343ff8b713b740d68fb43818222905&q=${searchTerm}&aqi=no`);
        console.log(res);
        let temp = res.data.current.temp_c;
        $(".temperature").html(`${temp} <sup>o</sup> C`);
        let city = res.data.location.name;
        let country = res.data.location.country;
        $(".city").html(`<i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp;${city},&nbsp;${country}`);
        let date = res.data.current.last_updated;
        $(".date").text(date)
        let img = res.data.forecast.forecastday[0].day.condition.icon;
        $(".condition").attr(`src`, `https:${img}`)
        let cond = res.data.forecast.forecastday[0].day.condition.text;
        $(".weather").text(cond);
        let sunrise = res.data.forecast.forecastday[0].astro.sunrise;
        let sunset = res.data.forecast.forecastday[0].astro.sunset;
        $("#sunrise").text(sunrise);
        $("#sunset").text(sunset);
        let maxt = res.data.forecast.forecastday[0].day.maxtemp_c;
        let mint = res.data.forecast.forecastday[0].day.mintemp_c;
        $("#maxt").html(`${maxt}<sup>o</sup> C`);
        $("#mint").html(`${mint}<sup>o</sup> C`);
        let daily = res.data.forecast.forecastday[0].hour;
        console.log(daily);
        for (let i of daily) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let img = document.createElement("img");
            let temp = i.temp_c;
            let time = i.time;
            let condition = i.condition.text;
            let img_src = i.condition.icon;
            img.setAttribute("src", img_src);
            td1.append(time);
            td2.append(temp);
            td3.append(condition);
            td4.append(img);
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            document.querySelector(".daily-info").insertAdjacentElement('beforeend', tr);

        }
    } catch (e) {
        console.log("error")
    }
})