!function(){function e(e,t){return new Promise((function(n,o){var a=Math.random()>.3;setInterval((function(){a?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}({form:document.querySelector(".form")}).form.addEventListener("submit",(function(t){t.preventDefault();for(var n=Number(t.target.delay.value),o=Number(t.target.step.value),a=Number(t.target.amount.value),r=0;r<a;r++){e(r+1,n+r*o).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))}))}}))}();
//# sourceMappingURL=03-promises.78210550.js.map