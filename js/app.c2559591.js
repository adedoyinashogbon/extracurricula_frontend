(function(){"use strict";var e={5558:function(e,t,r){var o=r(5130),s=r(6768);const n={id:"app"},a={key:0};function c(e,t,r,o,c,i){const l=(0,s.g2)("LessonList"),d=(0,s.g2)("ShoppingCart"),u=(0,s.g2)("CheckoutForm");return(0,s.uX)(),(0,s.CE)("div",n,[t[0]||(t[0]=(0,s.Lk)("header",{class:"app-header"},[(0,s.Lk)("h1",{class:"app-title"},[(0,s.Lk)("span",{class:"extra"},"Extra"),(0,s.Lk)("span",{class:"curricula"},"Curricula")])],-1)),c.isCheckingOut?((0,s.uX)(),(0,s.Wv)(u,{key:1,cartItems:c.cart,backendUrl:c.backendUrl,onOrderPlaced:i.completeOrder,onBackToCart:i.cancelCheckout},null,8,["cartItems","backendUrl","onOrderPlaced","onBackToCart"])):((0,s.uX)(),(0,s.CE)("div",a,[(0,s.bF)(l,{backendUrl:c.backendUrl,onAddToCart:i.addToCart},null,8,["backendUrl","onAddToCart"]),(0,s.bF)(d,{cartItems:c.cart,backendUrl:c.backendUrl,onRemoveFromCart:i.removeFromCart,onProceedCheckout:i.showCheckoutPage},null,8,["cartItems","backendUrl","onRemoveFromCart","onProceedCheckout"])]))])}r(4114),r(8111),r(116);var i=r(4232);const l={class:"lesson-controls"},d={class:"lesson-controls"};function u(e,t,r,n,a,c){const u=(0,s.g2)("LessonItem");return(0,s.uX)(),(0,s.CE)("div",null,[t[8]||(t[8]=(0,s.Lk)("h2",null,"Available Lessons",-1)),(0,s.Lk)("div",l,[t[5]||(t[5]=(0,s.Lk)("label",{for:"search"},"Search Lessons:",-1)),(0,s.bo)((0,s.Lk)("input",{id:"search",type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.searchQuery=e),placeholder:"Search by title, location, price, or availability",onInput:t[1]||(t[1]=(...e)=>c.filterLessons&&c.filterLessons(...e))},null,544),[[o.Jo,a.searchQuery]])]),(0,s.Lk)("div",d,[t[7]||(t[7]=(0,s.Lk)("label",{for:"sort"},"Sort By:",-1)),(0,s.bo)((0,s.Lk)("select",{id:"sort","onUpdate:modelValue":t[2]||(t[2]=e=>a.sortBy=e),onChange:t[3]||(t[3]=(...e)=>c.sortLessons&&c.sortLessons(...e))},t[6]||(t[6]=[(0,s.Lk)("option",{value:"title"},"Title",-1),(0,s.Lk)("option",{value:"location"},"Location",-1),(0,s.Lk)("option",{value:"price"},"Price",-1),(0,s.Lk)("option",{value:"spaces"},"Available Spaces",-1)]),544),[[o.u1,a.sortBy]]),(0,s.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>c.toggleSortOrder&&c.toggleSortOrder(...e))},[(0,s.Lk)("i",{class:(0,i.C4)(a.isAscending?"fas fa-sort-amount-up":"fas fa-sort-amount-down")},null,2),(0,s.eW)(" "+(0,i.v_)(a.isAscending?"Ascending":"Descending"),1)])]),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(c.sortedLessons,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e._id},[(0,s.bF)(u,{lesson:e,onAddToCart:c.addToCart},null,8,["lesson","onAddToCart"])])))),128))])}r(2489);const h={class:"lesson-item"},p=["src","alt"],k=["disabled"];function m(e,t,r,o,n,a){return(0,s.uX)(),(0,s.CE)("div",h,[(0,s.Lk)("img",{src:a.computedImageUrl,alt:r.lesson.title,class:"lesson-icon"},null,8,p),(0,s.Lk)("h3",null,(0,i.v_)(r.lesson.title),1),(0,s.Lk)("p",null,"Location: "+(0,i.v_)(r.lesson.location),1),(0,s.Lk)("p",null,"Price: $"+(0,i.v_)(r.lesson.price),1),(0,s.Lk)("p",null,"Spaces: "+(0,i.v_)(r.lesson.spaces),1),(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.addToCart&&a.addToCart(...e)),disabled:0===r.lesson.spaces},(0,i.v_)(0===r.lesson.spaces?"Sold Out":"Add to Cart"),9,k)])}var f={props:["lesson"],computed:{computedImageUrl(){const e="/extracurricula_frontend/";return this.lesson.icon?this.lesson.icon.startsWith("/icons/")?`${e}${this.lesson.icon.replace(/^\/+/,"")}`:`${e}icons/${this.lesson.icon.replace(/^\/+/,"")}`:`${e}icons/default-icon.png`}},methods:{addToCart(){this.lesson.spaces>0&&this.$emit("add-to-cart",this.lesson)}}},b=r(1241);const v=(0,b.A)(f,[["render",m],["__scopeId","data-v-f85198d4"]]);var C=v,L={components:{LessonItem:C},data(){return{lessons:[],filteredLessons:[],sortBy:"title",isAscending:!0,searchQuery:"",backendUrl:"https://extracurricula-backend.onrender.com"}},created(){this.fetchLessons()},computed:{sortedLessons(){return[...this.filteredLessons].sort(((e,t)=>{const r=this.isAscending?1:-1;return"title"===this.sortBy||"location"===this.sortBy?r*e[this.sortBy].localeCompare(t[this.sortBy]):r*(e[this.sortBy]-t[this.sortBy])}))}},methods:{async fetchLessons(){try{const e=await fetch(`${this.backendUrl}/lessons`),t=await e.json();this.lessons=t,this.filteredLessons=t}catch(e){console.error("❌ Error fetching lessons:",e)}},filterLessons(){const e=this.searchQuery.toLowerCase();this.filteredLessons=this.lessons.filter((t=>t.title.toLowerCase().includes(e)||t.location.toLowerCase().includes(e)||String(t.price).includes(e)||String(t.spaces).includes(e)))},sortLessons(){this.isAscending=!0},toggleSortOrder(){this.isAscending=!this.isAscending},addToCart(e){e.spaces>0&&this.$emit("add-to-cart",e)}}};const g=(0,b.A)(L,[["render",u],["__scopeId","data-v-50f634e5"]]);var y=g;const O={class:"shopping-cart"},_={key:0},U=["onClick"],I={key:1},A=["disabled"];function $(e,t,r,o,n,a){return(0,s.uX)(),(0,s.CE)("div",O,[t[1]||(t[1]=(0,s.Lk)("h2",null,"Shopping Cart",-1)),r.cartItems.length?((0,s.uX)(),(0,s.CE)("ul",_,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.cartItems,(e=>((0,s.uX)(),(0,s.CE)("li",{key:e._id},[(0,s.eW)((0,i.v_)(e.title)+" - $"+(0,i.v_)(e.price)+" (x"+(0,i.v_)(e.quantity)+") ",1),(0,s.Lk)("button",{onClick:t=>a.removeFromCart(e._id)},"Remove",8,U)])))),128))])):((0,s.uX)(),(0,s.CE)("p",I,"Your cart is empty.")),(0,s.Lk)("button",{onClick:t[0]||(t[0]=t=>e.$emit("proceed-checkout")),disabled:!r.cartItems.length},"Proceed to Checkout",8,A)])}var T={props:["cartItems","backendUrl"],methods:{removeFromCart(e){this.$emit("remove-from-cart",e)}}};const E=(0,b.A)(T,[["render",$]]);var w=E;const S={class:"checkout-form"},x={class:"form-group"},P={class:"form-group"},F=["disabled"];function B(e,t,r,n,a,c){return(0,s.uX)(),(0,s.CE)("div",S,[t[6]||(t[6]=(0,s.Lk)("h2",null,"Checkout",-1)),(0,s.Lk)("form",{onSubmit:t[2]||(t[2]=(0,o.D$)(((...e)=>c.submitOrder&&c.submitOrder(...e)),["prevent"]))},[(0,s.Lk)("div",x,[t[4]||(t[4]=(0,s.Lk)("label",{for:"name"},"Name:",-1)),(0,s.bo)((0,s.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>a.name=e),id:"name",type:"text",placeholder:"Enter your name",required:""},null,512),[[o.Jo,a.name]])]),(0,s.Lk)("div",P,[t[5]||(t[5]=(0,s.Lk)("label",{for:"phone"},"Phone:",-1)),(0,s.bo)((0,s.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>a.phone=e),id:"phone",type:"text",placeholder:"Enter your phone number",required:""},null,512),[[o.Jo,a.phone]])]),(0,s.Lk)("button",{disabled:!c.isFormValid},"Place Order",8,F)],32),(0,s.Lk)("button",{onClick:t[3]||(t[3]=t=>e.$emit("back-to-cart")),class:"back-button"},"Back to Cart")])}r(1701);var X={props:["cartItems","backendUrl"],data(){return{name:"",phone:""}},computed:{isFormValid(){return/^[a-zA-Z\s]+$/.test(this.name)&&/^[0-9]{10,15}$/.test(this.phone)}},methods:{async submitOrder(){if(0!==this.cartItems.length)try{const e=await fetch(`${this.backendUrl}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:this.name,phone:this.phone,lessonIds:this.cartItems.map((e=>e._id))})});e.ok?(alert("✅ Order placed successfully!"),this.$emit("order-placed")):(console.error("❌ Order failed"),alert("⚠️ Order failed. Please try again."))}catch(e){console.error("❌ Error submitting order:",e),alert("⚠️ An error occurred while processing your order.")}else alert("⚠️ Your cart is empty! Add items before placing an order.")}}};const j=(0,b.A)(X,[["render",B],["__scopeId","data-v-79a85385"]]);var q=j,J={components:{LessonList:y,ShoppingCart:w,CheckoutForm:q},data(){return{cart:[],isCheckingOut:!1,backendUrl:"https://extracurricula-backend.onrender.com"}},methods:{async addToCart(e){if(e.spaces<=0)return;let t=this.cart.find((t=>t._id===e._id));t?t.quantity++:this.cart.push({...e,quantity:1});try{await fetch(`${this.backendUrl}/lessons/${e._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({spaces:e.spaces-1})}),e.spaces--}catch(r){console.error("❌ Error updating backend spaces:",r)}},async removeFromCart(e){const t=this.cart.findIndex((t=>t._id===e));if(-1===t)return;const r=this.cart[t];try{await fetch(`${this.backendUrl}/lessons/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({spaces:Math.min(5,r.spaces+r.quantity)})}),this.cart.splice(t,1)}catch(o){console.error("❌ Error restoring spaces:",o)}},showCheckoutPage(){this.isCheckingOut=!0},completeOrder(){this.cart=[],this.isCheckingOut=!1},cancelCheckout(){this.isCheckingOut=!1}}};const V=(0,b.A)(J,[["render",c],["__scopeId","data-v-41a60f9e"]]);var N=V;const Q="https://extracurricula-backend.onrender.com",R=(0,o.Ef)(N);R.config.globalProperties.$backendUrl=Q,console.log("✅ Backend URL:",Q),R.mount("#app")}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}r.m=e,function(){var e=[];r.O=function(t,o,s,n){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],s=e[d][1],n=e[d][2];for(var c=!0,i=0;i<o.length;i++)(!1&n||a>=n)&&Object.keys(r.O).every((function(e){return r.O[e](o[i])}))?o.splice(i--,1):(c=!1,n<a&&(a=n));if(c){e.splice(d--,1);var l=s();void 0!==l&&(t=l)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,s,n]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var s,n,a=o[0],c=o[1],i=o[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(s in c)r.o(c,s)&&(r.m[s]=c[s]);if(i)var d=i(r)}for(t&&t(o);l<a.length;l++)n=a[l],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(d)},o=self["webpackChunkextracurricula_frontend"]=self["webpackChunkextracurricula_frontend"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=r.O(void 0,[504],(function(){return r(5558)}));o=r.O(o)})();
//# sourceMappingURL=app.c2559591.js.map