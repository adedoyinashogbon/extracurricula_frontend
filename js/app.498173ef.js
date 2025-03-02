(function(){"use strict";var e={7297:function(e,t,r){var o=r(5130),n=r(6768);const s={id:"app"},a={key:0};function c(e,t,r,o,c,i){const l=(0,n.g2)("LessonList"),d=(0,n.g2)("ShoppingCart"),u=(0,n.g2)("CheckoutForm");return(0,n.uX)(),(0,n.CE)("div",s,[t[0]||(t[0]=(0,n.Lk)("header",{class:"app-header"},[(0,n.Lk)("h1",{class:"app-title"},[(0,n.Lk)("span",{class:"extra"},"Extra"),(0,n.Lk)("span",{class:"curricula"},"Curricula")])],-1)),c.isCheckingOut?((0,n.uX)(),(0,n.Wv)(u,{key:1,cartItems:c.cart,backendUrl:c.backendUrl,onOrderPlaced:i.completeOrder,onBackToCart:i.cancelCheckout},null,8,["cartItems","backendUrl","onOrderPlaced","onBackToCart"])):((0,n.uX)(),(0,n.CE)("div",a,[(0,n.bF)(l,{backendUrl:c.backendUrl,onAddToCart:i.addToCart},null,8,["backendUrl","onAddToCart"]),(0,n.bF)(d,{cartItems:c.cart,backendUrl:c.backendUrl,onRemoveFromCart:i.removeFromCart,onProceedCheckout:i.showCheckoutPage},null,8,["cartItems","backendUrl","onRemoveFromCart","onProceedCheckout"])]))])}r(4114),r(8111),r(116);var i=r(4232);const l={class:"lesson-controls"};function d(e,t,r,s,a,c){const d=(0,n.g2)("LessonItem");return(0,n.uX)(),(0,n.CE)("div",null,[t[5]||(t[5]=(0,n.Lk)("h2",null,"Available Lessons",-1)),(0,n.Lk)("div",l,[t[4]||(t[4]=(0,n.Lk)("label",{for:"sort"},"Sort By:",-1)),(0,n.bo)((0,n.Lk)("select",{id:"sort","onUpdate:modelValue":t[0]||(t[0]=e=>a.sortBy=e),onChange:t[1]||(t[1]=(...e)=>c.sortLessons&&c.sortLessons(...e))},t[3]||(t[3]=[(0,n.Lk)("option",{value:"title"},"Title",-1),(0,n.Lk)("option",{value:"price"},"Price",-1),(0,n.Lk)("option",{value:"spaces"},"Available Spaces",-1)]),544),[[o.u1,a.sortBy]]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>c.toggleSortOrder&&c.toggleSortOrder(...e))},[(0,n.Lk)("i",{class:(0,i.C4)(a.isAscending?"fas fa-sort-amount-up":"fas fa-sort-amount-down")},null,2),(0,n.eW)(" "+(0,i.v_)(a.isAscending?"Ascending":"Descending"),1)])]),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(c.sortedLessons,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e._id},[(0,n.bF)(d,{lesson:e,onAddToCart:c.addToCart},null,8,["lesson","onAddToCart"])])))),128))])}const u={class:"lesson-item"},p=["src","alt"],h=["disabled"];function m(e,t,r,o,s,a){return(0,n.uX)(),(0,n.CE)("div",u,[(0,n.Lk)("img",{src:a.computedImageUrl,alt:r.lesson.title,class:"lesson-icon"},null,8,p),(0,n.Lk)("h3",null,(0,i.v_)(r.lesson.title),1),(0,n.Lk)("p",null,"Location: "+(0,i.v_)(r.lesson.location),1),(0,n.Lk)("p",null,"Price: $"+(0,i.v_)(r.lesson.price),1),(0,n.Lk)("p",null,"Spaces: "+(0,i.v_)(r.lesson.spaces),1),(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.addToCart&&a.addToCart(...e)),disabled:0===r.lesson.spaces},(0,i.v_)(0===r.lesson.spaces?"Sold Out":"Add to Cart"),9,h)])}var k={props:["lesson"],computed:{computedImageUrl(){return this.lesson.icon?this.lesson.icon.startsWith("/icons/")?this.lesson.icon:`/icons/${this.lesson.icon.replace(/^\/+/,"")}`:"/icons/default-icon.png"}},methods:{addToCart(){this.lesson.spaces>0&&this.$emit("add-to-cart",this.lesson)}}},f=r(1241);const b=(0,f.A)(k,[["render",m],["__scopeId","data-v-a233c3c2"]]);var v=b,C={components:{LessonItem:v},data(){return{lessons:[],sortBy:"title",isAscending:!0,backendUrl:"https://extracurricula-backend.onrender.com"}},created(){this.fetchLessons()},computed:{sortedLessons(){return[...this.lessons].sort(((e,t)=>{const r=this.isAscending?1:-1;return"title"===this.sortBy?r*e.title.localeCompare(t.title):r*(e[this.sortBy]-t[this.sortBy])}))}},methods:{async fetchLessons(){try{const e=await fetch(`${this.backendUrl}/lessons`);this.lessons=await e.json()}catch(e){console.error("❌ Error fetching lessons:",e)}},sortLessons(){this.isAscending=!0},toggleSortOrder(){this.isAscending=!this.isAscending},addToCart(e){e.spaces>0&&this.$emit("add-to-cart",e)}}};const g=(0,f.A)(C,[["render",d],["__scopeId","data-v-6389f660"]]);var y=g;const L={class:"shopping-cart"},O={key:0},_=["onClick"],U={key:1},A=["disabled"];function I(e,t,r,o,s,a){return(0,n.uX)(),(0,n.CE)("div",L,[t[1]||(t[1]=(0,n.Lk)("h2",null,"Shopping Cart",-1)),r.cartItems.length?((0,n.uX)(),(0,n.CE)("ul",O,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.cartItems,(e=>((0,n.uX)(),(0,n.CE)("li",{key:e._id},[(0,n.eW)((0,i.v_)(e.title)+" - $"+(0,i.v_)(e.price)+" (x"+(0,i.v_)(e.quantity)+") ",1),(0,n.Lk)("button",{onClick:t=>a.removeFromCart(e._id)},"Remove",8,_)])))),128))])):((0,n.uX)(),(0,n.CE)("p",U,"Your cart is empty.")),(0,n.Lk)("button",{onClick:t[0]||(t[0]=t=>e.$emit("proceed-checkout")),disabled:!r.cartItems.length},"Proceed to Checkout",8,A)])}var T={props:["cartItems","backendUrl"],methods:{removeFromCart(e){this.$emit("remove-from-cart",e)}}};const E=(0,f.A)(T,[["render",I]]);var $=E;const P={class:"checkout-form"},w={class:"form-group"},x={class:"form-group"},F=["disabled"];function S(e,t,r,s,a,c){return(0,n.uX)(),(0,n.CE)("div",P,[t[6]||(t[6]=(0,n.Lk)("h2",null,"Checkout",-1)),(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,o.D$)(((...e)=>c.submitOrder&&c.submitOrder(...e)),["prevent"]))},[(0,n.Lk)("div",w,[t[4]||(t[4]=(0,n.Lk)("label",{for:"name"},"Name:",-1)),(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>a.name=e),id:"name",type:"text",placeholder:"Enter your name",required:""},null,512),[[o.Jo,a.name]])]),(0,n.Lk)("div",x,[t[5]||(t[5]=(0,n.Lk)("label",{for:"phone"},"Phone:",-1)),(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>a.phone=e),id:"phone",type:"text",placeholder:"Enter your phone number",required:""},null,512),[[o.Jo,a.phone]])]),(0,n.Lk)("button",{disabled:!c.isFormValid},"Place Order",8,F)],32),(0,n.Lk)("button",{onClick:t[3]||(t[3]=t=>e.$emit("back-to-cart")),class:"back-button"},"Back to Cart")])}r(1701);var X={props:["cartItems","backendUrl"],data(){return{name:"",phone:""}},computed:{isFormValid(){return/^[a-zA-Z\s]+$/.test(this.name)&&/^[0-9]{10,15}$/.test(this.phone)}},methods:{async submitOrder(){if(0!==this.cartItems.length)try{const e=await fetch(`${this.backendUrl}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:this.name,phone:this.phone,lessonIds:this.cartItems.map((e=>e._id))})});e.ok?(alert("✅ Order placed successfully!"),this.$emit("order-placed")):(console.error("❌ Order failed"),alert("⚠️ Order failed. Please try again."))}catch(e){console.error("❌ Error submitting order:",e),alert("⚠️ An error occurred while processing your order.")}else alert("⚠️ Your cart is empty! Add items before placing an order.")}}};const B=(0,f.A)(X,[["render",S],["__scopeId","data-v-79a85385"]]);var j=B,q={components:{LessonList:y,ShoppingCart:$,CheckoutForm:j},data(){return{cart:[],isCheckingOut:!1,backendUrl:"https://extracurricula-backend.onrender.com"}},methods:{async addToCart(e){if(e.spaces<=0)return;let t=this.cart.find((t=>t._id===e._id));t?t.quantity++:this.cart.push({...e,quantity:1});try{await fetch(`${this.backendUrl}/lessons/${e._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({spaces:e.spaces-1})}),e.spaces--}catch(r){console.error("❌ Error updating backend spaces:",r)}},async removeFromCart(e){const t=this.cart.findIndex((t=>t._id===e));if(-1===t)return;const r=this.cart[t];try{await fetch(`${this.backendUrl}/lessons/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({spaces:Math.min(5,r.spaces+r.quantity)})}),this.cart.splice(t,1)}catch(o){console.error("❌ Error restoring spaces:",o)}},showCheckoutPage(){this.isCheckingOut=!0},completeOrder(){this.cart=[],this.isCheckingOut=!1},cancelCheckout(){this.isCheckingOut=!1}}};const J=(0,f.A)(q,[["render",c],["__scopeId","data-v-41a60f9e"]]);var V=J;const N="https://extracurricula-backend.onrender.com",R=(0,o.Ef)(V);R.config.globalProperties.$backendUrl=N,console.log("✅ Backend URL:",N),R.mount("#app")}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,r),s.exports}r.m=e,function(){var e=[];r.O=function(t,o,n,s){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],n=e[d][1],s=e[d][2];for(var c=!0,i=0;i<o.length;i++)(!1&s||a>=s)&&Object.keys(r.O).every((function(e){return r.O[e](o[i])}))?o.splice(i--,1):(c=!1,s<a&&(a=s));if(c){e.splice(d--,1);var l=n();void 0!==l&&(t=l)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[o,n,s]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,s,a=o[0],c=o[1],i=o[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(n in c)r.o(c,n)&&(r.m[n]=c[n]);if(i)var d=i(r)}for(t&&t(o);l<a.length;l++)s=a[l],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(d)},o=self["webpackChunkextracurricula_frontend"]=self["webpackChunkextracurricula_frontend"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=r.O(void 0,[504],(function(){return r(7297)}));o=r.O(o)})();
//# sourceMappingURL=app.498173ef.js.map