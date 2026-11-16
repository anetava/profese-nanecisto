'use strict';
/* Keep the saved record format usable by older portfolios and file exchanges. */
window.Volba = (() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let sequence=0;
  function field({label,items=[],value='',name='',answer,moment,required=false,max=1600,hint='',tiles=true}) {
    value=String(value ?? '');
    const id='vyber-'+(++sequence);
    if(value && !items.some(item=>value===item || value.startsWith(item+'\n')))items=[value,...items];
    const known=items.find(item=>value===item || value.startsWith(item+'\n')) || '';
    const own=known?value.slice(known.length).replace(/^\n/,''):value;
    const opts=items.map((item,i)=>tiles?'<label class="pick-tile"><input type="radio" name="'+id+'" value="'+escape(item)+'" '+(known===item?'checked':'')+'><span>'+escape(item)+'</span></label>':
      '<option value="'+escape(item)+'" '+(known===item?'selected':'')+'>'+escape(item)+'</option>').join('');
    const attrs=(name?' name="'+escape(name)+'"':'')+(answer!=null?' data-answer="'+answer+'"':'')+(moment?' data-moment="'+escape(moment)+'"':'');
    return '<fieldset class="pick-field" data-pick-field data-required="'+required+'" data-limit="'+max+'"><legend id="'+id+'-q">'+escape(label)+'</legend>'+
      (hint?'<small class="pick-hint">'+escape(hint)+'</small>':'')+
      (tiles?'<div class="pick-list" data-pick-options>'+opts+(!required?'<label class="pick-tile pick-skip"><input type="radio" name="'+id+'" value="" '+(!known?'checked':'')+'><span>Vynechat</span></label>':'')+'</div>':'<select data-pick-options aria-labelledby="'+id+'-q"><option value="">Vyberte možnost…</option>'+opts+'</select>')+
      '<details class="pick-own" '+(own?'open':'')+'><summary>Vlastní text</summary><label class="sr" for="'+id+'-own">'+escape(label)+' – vlastní text nebo doplnění</label><textarea rows="2" id="'+id+'-own" data-pick-own maxlength="'+max+'" placeholder="Můžete napsat vlastní odpověď nebo doplnit vybranou možnost.">'+escape(own)+'</textarea></details>'+
      '<input type="hidden" data-pick-value'+attrs+' value="'+escape(value)+'"><p class="pick-error" role="alert" hidden></p></fieldset>';
  }
  function sync(box) {
    const menu=box.querySelector('select[data-pick-options]'), choice=menu?menu.value:(box.querySelector('input[type=radio]:checked')?.value || '');
    const own=box.querySelector('[data-pick-own]').value.trim();
    const joined=[choice,own].filter(Boolean).join('\n');
    box.querySelector('[data-pick-value]').value=joined;
    box.querySelector('.pick-error').hidden=true;
  }
  function eventSync(ev) {
    const box=ev.target.closest('[data-pick-field]');
    if(box)sync(box);
  }
  document.addEventListener('input',eventSync,true);
  document.addEventListener('change',eventSync,true);
  document.addEventListener('submit',ev=>{
    const draft=ev.submitter?.value==='draft';
    for(const box of ev.target.querySelectorAll('[data-pick-field]')){
      sync(box);
      const value=box.querySelector('[data-pick-value]').value;
      const msg=value.length>Number(box.dataset.limit)?'Zkraťte doplnění, celá odpověď může mít '+box.dataset.limit+' znaků.':
        (!draft && !value && box.dataset.required==='true'?'Vyberte možnost nebo přidejte vlastní text.':'');
      if(!msg)continue;
      ev.preventDefault();ev.stopPropagation();
      const details=box.closest('details');if(details)details.open=true;
      const error=box.querySelector('.pick-error');error.textContent=msg;error.hidden=false;
      box.querySelector('select,input[type=radio]')?.focus();break;
    }
  },true);
  return {field};
})();
