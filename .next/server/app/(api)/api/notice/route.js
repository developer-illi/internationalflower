(()=>{var e={};e.id=598,e.ids=[598],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33380:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>h,routeModule:()=>u,serverHooks:()=>x,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>c});var s={};r.r(s),r.d(s,{GET:()=>p});var i=r(96559),a=r(48088),o=r(37719),n=r(32190),d=r(46950);async function p(e){try{let{searchParams:t}=new URL(e.url),r=t.get("search");if(r)return n.NextResponse.json(d.y.filter(e=>e.title.toLowerCase().includes(r.toLowerCase())));return n.NextResponse.json(d.y)}catch(e){return n.NextResponse.json({error:"공지사항 데이터를 불러오는데 실패했습니다."},{status:500})}}let u=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/(api)/api/notice/route",pathname:"/api/notice",filename:"route",bundlePath:"app/(api)/api/notice/route"},resolvedPagePath:"/Users/kim/deploy/interflower/internationalflower/src/app/(api)/api/notice/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:l,workUnitAsyncStorage:c,serverHooks:x}=u;function h(){return(0,o.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:c})}},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},46950:(e,t,r)=>{"use strict";r.d(t,{c:()=>a,y:()=>i});var s=r(57627);let i=[{id:1,title:"공지 제목 1",date:"2024.01.01"},{id:2,title:"공지 제목 2",date:"2024.01.02"},{id:3,title:"공지 제목 3",date:"2024.01.03"},{id:4,title:"공지 제목 4",date:"2024.01.04"},{id:5,title:"공지 제목 5",date:"2024.01.05"}],a={id:1,title:"공지 제목입니다.",content:s.f,date:"2024.12.20"}},57627:(e,t,r)=>{"use strict";r.d(t,{f:()=>s});let s=`
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
`},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},96487:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4447,580],()=>r(33380));module.exports=s})();