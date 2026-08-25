const app=document.querySelector('#app');let current='dashboard';
const state={projects:JSON.parse(localStorage.getItem('ots_projects')||'[]'),admin:localStorage.getItem('ots_admin')==='1'};
function save(){localStorage.setItem('ots_projects',JSON.stringify(state.projects))}
function page(name){
 current=name; document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.page===name));
 if(name==='dashboard') app.innerHTML=`<section><h2>Development cockpit</h2><p class="muted">Build and manage OS-oriented tools from a portable PWA. Browser security still controls what can execute locally.</p>
 <div class="grid"><div class="card"><h3>Projects</h3><b>${state.projects.length}</b><p class="muted">Local projects</p></div><div class="card"><h3>Terminal</h3><p class="muted">Browser sandbox terminal emulator.</p><button onclick="page('terminal')">Open terminal</button></div><div class="card"><h3>Admin</h3><p class="muted">Owner controls and configuration.</p><button onclick="page('admin')">Open admin</button></div></div></section>`;
 if(name==='editor') app.innerHTML=`<section><h2>Code Editor</h2><div class="row"><input id="fname" value="tool.js" style="max-width:220px"><button class="primary" onclick="saveFile()">Save to project</button></div><br><textarea id="code">// OS Toolsmith starter tool
console.log("Hello from OS Toolsmith");</textarea><p class="muted">This editor stores source in your browser. Native OS execution requires a compatible backend/companion service.</p></section>`;
 if(name==='terminal') terminal();
 if(name==='projects') projects();
 if(name==='admin') admin();
}
function terminal(){app.innerHTML=`<section><h2>Terminal</h2><div id="term" class="terminal"><span class="prompt">toolsmith@pwa:~$</span> ready\nType <b>help</b> for commands.</div><br><input id="cmd" autocomplete="off" placeholder="help, ls, pwd, clear, date, echo hello"><p class="muted">This is a sandbox terminal for the PWA. It does not bypass device security or execute arbitrary native commands.</p></section>`;document.querySelector('#cmd').focus();document.querySelector('#cmd').onkeydown=e=>{if(e.key==='Enter')runCmd(e.target.value)}}
function runCmd(c){let out=document.querySelector('#term');let result='';if(c==='help')result='help  ls  pwd  clear  date  echo <text>';else if(c==='ls')result=state.projects.map(x=>x.name).join('\\n')||'(no projects)';else if(c==='pwd')result='/workspace';else if(c==='date')result=new Date().toString();else if(c==='clear'){out.textContent='';document.querySelector('#cmd').value='';return}else if(c.startsWith('echo '))result=c.slice(5);else result=`command not found: ${c}`;out.innerHTML+=`\\n<span class="prompt">toolsmith@pwa:~$</span> ${escapeHtml(c)}\\n${escapeHtml(result)}`;document.querySelector('#cmd').value='';out.scrollTop=out.scrollHeight}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function projects(){app.innerHTML=`<section><h2>Projects</h2><div class="row"><input id="newp" placeholder="Project name"><button class="primary" onclick="addProject()">Create</button></div><br>${state.projects.map((p,i)=>`<div class="card file"><b>${escapeHtml(p.name)}</b><span class="muted"> — ${new Date(p.created).toLocaleString()}</span><button style="float:right" class="danger" onclick="delProject(${i})">Delete</button></div>`).join('')||'<p class="muted">No projects yet.</p>'}</section>`}
function addProject(){let n=document.querySelector('#newp').value.trim();if(!n)return;state.projects.push({name:n,created:Date.now()});save();projects()}
function delProject(i){state.projects.splice(i,1);save();projects()}
function saveFile(){alert('Starter source saved for this editor session. Project-file persistence is the next module.')}
function admin(){app.innerHTML=`<section><h2>Admin Console</h2><div class="card"><h3>Owner mode</h3><p class="muted">${state.admin?'Enabled on this browser.':'Disabled.'}</p>${state.admin?`<button class="danger" onclick="disableAdmin()">Disable admin mode</button>`:`<input id="adminCode" type="password" placeholder="Choose an owner password"><br><br><button class="primary" onclick="enableAdmin()">Enable local admin</button>`}</div><br><div class="card"><h3>Architecture</h3><p class="muted">Local configuration is stored in browser storage. A future secure backend can provide authentication, real terminal execution, packages, remote devices, and synchronized projects.</p></div></section>`}
function enableAdmin(){let x=document.querySelector('#adminCode').value;if(x.length<8)return alert('Use at least 8 characters.');localStorage.setItem('ots_admin','1');state.admin=true;admin()}
function disableAdmin(){localStorage.removeItem('ots_admin');state.admin=false;admin()}
document.querySelectorAll('.nav').forEach(x=>x.onclick=()=>page(x.dataset.page));
let deferred;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;document.querySelector('#installBtn').onclick=async()=>{deferred.prompt();await deferred.userChoice;deferred=null}});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
page('dashboard');