(()=>{var e={};e.id=643,e.ids=[643],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},20249:(e,t,r)=>{"use strict";r.d(t,{R:()=>i,f:()=>a});var s=r(57627);let i=[{id:1,title:"뉴스 제목 1",content:"뉴스 내용 1",date:"2024.01.01",type:"issues",image:"/images/dummy/1.png"},{id:2,title:"뉴스 제목 2",content:"뉴스 내용 2",date:"2024.01.02",type:"issues",image:"/images/dummy/2.png"},{id:3,title:"뉴스 제목 3",content:"뉴스 내용 3",date:"2024.01.03",type:"report",image:"/images/dummy/3.png"},{id:4,title:"뉴스 제목 4",content:"뉴스 내용 4",date:"2024.01.04",type:"report",image:"/images/dummy/4.png"}],a={id:1,title:"뉴스 제목 1",content:s.f,date:"2024.01.01",type:"issues"}},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57627:(e,t,r)=>{"use strict";r.d(t,{f:()=>s});let s=`
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
`},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},84781:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>u,serverHooks:()=>m,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>c});var s={};r.r(s),r.d(s,{GET:()=>p});var i=r(96559),a=r(48088),n=r(37719),o=r(32190),d=r(20249);async function p(e,{params:t}){try{let{id:e}=await t;if(e)return o.NextResponse.json(d.f);return o.NextResponse.json({error:"잘못된 id 파라미터입니다."},{status:400})}catch(e){return o.NextResponse.json({error:"데이터를 불러오는데 실패했습니다."},{status:500})}}let u=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/(api)/api/news/[id]/route",pathname:"/api/news/[id]",filename:"route",bundlePath:"app/(api)/api/news/[id]/route"},resolvedPagePath:"/Users/kim/deploy/interflower/internationalflower/src/app/(api)/api/news/[id]/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:c,serverHooks:m}=u;function g(){return(0,n.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:c})}},96487:()=>{}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4447,580],()=>r(84781));module.exports=s})();