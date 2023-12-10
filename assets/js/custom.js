// prettier-ignore
/* eslint-disable */
$(document).ready(function(){let t=!1,e=$("#overlay, #modal, #overlay-dark, #intro-container"),n,i;function o(){if(t)return;let e={action_id:i.device.action_id,complete_view:!0},o={action_id:i.device.action_id,skip_at_in_sec:n.currentTime};d(e,()=>{d(o,()=>{},r)},r)}function c(){let t,e;!function n(){let o=$("#countdown");void 0!==e&&clearInterval(e),t=i.ad_entity.meta.skip_timeout_in_sec,o.text(t),e=setInterval(function(){t-=1,o.text(t),t<=0&&(d({action_id:i.device.action_id,view:!0},()=>{}),clearInterval(e),$("#skipBtn").prop("disabled",!1),$("#countdownWrapper").hide(),$("#skipIcon").fadeIn())},1e3)}()}function a(){Slider=$("#slider").Swipe({auto:3e3,continuous:!0}).data("Swipe"),$(".next").on("click",Slider.next),$(".prev").on("click",Slider.prev)}function d(t,e,n){$.ajax({url:"https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp/action",type:"PUT",data:t,success:e,error:n})}function r(){console.error("An error occurred while fetching data")}(function t(){try{$.ajax({url:"https://fundamentals-mvp-52a0fc0c5969.herokuapp.com/v1/mvp?mac=4554",type:"GET",success:function(t){i=t.data,$("#preloader").fadeOut(),t.data.device.exist?c():e.fadeIn(),function t(){if("video"===i.ad.ad_content.type){let e=i.ad.ad_content.content[0],c=e.split(".").pop(),d=`video/${c}`,r=`
        <video id="background-video" muted ${i.device.exist?"autoplay":""} playsInline>
        <source src="${e}" type="${d}" />
        </video>
        `;$("#ad").html(r),$("#progress").show(),n=document.getElementById("background-video");let s=document.getElementById("progress-bar");$("#background-video").on("ended",o),n.addEventListener("timeupdate",function(){let t=n.currentTime/n.duration*100;s.style.width=t+"%"})}else{let l=i.ad.ad_content.content,u=$("#ad-images");u.empty();let p=l.map(function(t){return`<div><img src="${t}" /></div>`}).join("");u.html(p),i.device.exist&&a()}$("#ad-link").css({background:"#333333",color:"#ADE6FF"}),$("#ad-company").text(i.ad_entity.name),$("#ad-discription").text(i.ad.ad_description),$("#ad-link").attr("href",i.ad.ad_cta_redirect),$("#ad-link").attr("target","_blank"),$("#sponsor-logo").attr("src",i.ad_entity.logo);let f=`<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="${i.ad_entity.meta.cta_text_color}"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg>`;$("#ad-link-icon").html(f)}()},error:function(){console.error("An error occurred while fetching data")}})}catch(d){console.log(d)}})(),$("#toggleCheckbox").on("change",function t(){$("#connectBtn").prop("disabled",!$(this).is(":checked"))}),$("#termsCondtions").on("click",function t(e){e.preventDefault(),$("#intro-container").fadeOut(),setTimeout(function(){$("#terms-conditions").fadeIn()},300)}),$("#backButton").on("click",function t(){$("#terms-conditions").fadeOut(),setTimeout(function(){$("#intro-container").fadeIn()},300)}),$("#connectBtn").on("click",function t(){e.fadeOut(),setTimeout(()=>{n?n.play():a(),c()},300)}),$("#skipBtn").on("click",function e(){t=!0,$(this).prop("disabled",!0),d({action_id:i.device.action_id,skip_at_in_sec:n.currentTime},()=>{$(this).prop("disabled",!1)},()=>{$(this).prop("disabled",!1)})}),$("#ad-link").on("click",function t(e){e.preventDefault(),d({action_id:i.device.action_id,click:!0},()=>{window.location.href=i.ad.ad_cta_redirect})})});
