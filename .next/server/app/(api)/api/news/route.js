(()=>{var e={};e.id=8503,e.ids=[8503],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},20249:(e,t,r)=>{"use strict";r.d(t,{R:()=>i,f:()=>n});var s=r(57627);let i=[{id:1,title:"뉴스 제목 1",content:"뉴스 내용 1",date:"2024.01.01",type:"issues",image:"/images/dummy/1.png"},{id:2,title:"뉴스 제목 2",content:"뉴스 내용 2",date:"2024.01.02",type:"issues",image:"/images/dummy/2.png"},{id:3,title:"뉴스 제목 3",content:"뉴스 내용 3",date:"2024.01.03",type:"report",image:"/images/dummy/3.png"},{id:4,title:"뉴스 제목 4",content:"뉴스 내용 4",date:"2024.01.04",type:"report",image:"/images/dummy/4.png"}],n={id:1,title:"뉴스 제목 1",content:s.f,date:"2024.01.01",type:"issues"}},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},54322:(e,t,r)=>{"use strict";r.d(t,{d:()=>s});let s={all:"ALL",issues:"최근이슈",report:"보도자료"}},57627:(e,t,r)=>{"use strict";r.d(t,{f:()=>s});let s=`
<div>
  <h1>안녕하세요! 😊</h1>
  <p>이것은 <strong>샘플 HTML</strong> 문자열입니다.</p>
  <ul>
    <li>항목 1</li>
    <li>항목 2</li>
    <li>항목 3</li>
  </ul>
  <img src="/images/dummy/1.png" alt="샘플 이미지" />
  <blockquote>“이것은 인용문입니다.”</blockquote>
  <a href="https://example.com" target="_blank">예제 링크</a>
  <table border="1">
    <tr>
      <th>이름</th>
      <th>나이</th>
    </tr>
    <tr>
      <td>홍길동</td>
      <td>25</td>
    </tr>
    <tr>
      <td>김철수</td>
      <td>30</td>
    </tr>
  </table>
</div>
`},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},73214:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>x,routeModule:()=>l,serverHooks:()=>g,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>m});var s={};r.r(s),r.d(s,{GET:()=>u});var i=r(96559),n=r(48088),a=r(37719),o=r(20249),p=r(85734),d=r(32190);async function u(e){try{let{searchParams:t}=new URL(e.url),r=t.get("type")||"all";if("all"===r)return d.NextResponse.json(o.R);if((0,p.gk)(r))return d.NextResponse.json(o.R.filter(e=>e.type===r));return d.NextResponse.json({error:"잘못된 type 파라미터입니다."},{status:400})}catch(e){return d.NextResponse.json({error:"데이터를 불러오는데 실패했습니다."},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/(api)/api/news/route",pathname:"/api/news",filename:"route",bundlePath:"app/(api)/api/news/route"},resolvedPagePath:"/Users/kim/deploy/interflower/internationalflower/src/app/(api)/api/news/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:c,workUnitAsyncStorage:m,serverHooks:g}=l;function x(){return(0,a.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:m})}},78335:()=>{},85734:(e,t,r)=>{"use strict";r.d(t,{gk:()=>i,zN:()=>n});var s=r(54322);let i=e=>Object.keys(s.d).includes(e),n=e=>s.d[e]},96487:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4447,580],()=>r(73214));module.exports=s})();