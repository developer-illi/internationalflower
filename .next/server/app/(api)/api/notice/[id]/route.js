(()=>{var e={};e.id=4444,e.ids=[4444],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},46950:(e,t,r)=>{"use strict";r.d(t,{c:()=>a,y:()=>s});var i=r(57627);let s=[{id:1,title:"공지 제목 1",date:"2024.01.01"},{id:2,title:"공지 제목 2",date:"2024.01.02"},{id:3,title:"공지 제목 3",date:"2024.01.03"},{id:4,title:"공지 제목 4",date:"2024.01.04"},{id:5,title:"공지 제목 5",date:"2024.01.05"}],a={id:1,title:"공지 제목입니다.",content:i.f,date:"2024.12.20"}},57627:(e,t,r)=>{"use strict";r.d(t,{f:()=>i});let i=`
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
`},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},90861:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>h,routeModule:()=>u,serverHooks:()=>x,workAsyncStorage:()=>l,workUnitAsyncStorage:()=>c});var i={};r.r(i),r.d(i,{GET:()=>p});var s=r(96559),a=r(48088),o=r(37719),n=r(32190),d=r(46950);async function p(e,{params:t}){try{let{id:e}=await t;if(e)return n.NextResponse.json(d.c);return n.NextResponse.json({error:"잘못된 id 파라미터입니다."},{status:400})}catch(e){return n.NextResponse.json({error:"데이터를 불러오는데 실패했습니다."},{status:500})}}let u=new s.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/(api)/api/notice/[id]/route",pathname:"/api/notice/[id]",filename:"route",bundlePath:"app/(api)/api/notice/[id]/route"},resolvedPagePath:"/Users/kim/deploy/interflower/internationalflower/src/app/(api)/api/notice/[id]/route.ts",nextConfigOutput:"",userland:i}),{workAsyncStorage:l,workUnitAsyncStorage:c,serverHooks:x}=u;function h(){return(0,o.patchFetch)({workAsyncStorage:l,workUnitAsyncStorage:c})}},96487:()=>{}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[4447,580],()=>r(90861));module.exports=i})();