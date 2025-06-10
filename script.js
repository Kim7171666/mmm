document.addEventListener('DOMContentLoaded', ()=>{

  // 1. BGM 播放控制
  const bgm = document.getElementById('bgm');
  const btnBgm = document.getElementById('btn-bgm');
  btnBgm.addEventListener('click', ()=>{
    if (bgm.paused) { bgm.play(); btnBgm.textContent = '🔊'; }
    else { bgm.pause(); btnBgm.textContent = '🔈'; }
  });
  // 自动播放尝试
  bgm.play().catch(_=>{ btnBgm.textContent='🔈'; });

  // 2. 鼠标点击特效（confetti）
  document.addEventListener('click', (e)=>{
    confetti({
      particleCount: 8,
      spread: 60,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#cc0000','#ccaa00']
    });
  });

  // 3. 初始化 Swiper 画廊
  new Swiper('.swiper-container', {
    loop: true, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });

  // 4. 初始化 FullCalendar 约稿记账
  const calendarEl = document.getElementById('calendar-container');
  const storedEvents = JSON.parse(localStorage.getItem('commissions')||'[]');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'zh-cn',
    events: storedEvents,
    dateClick: info => {
      const title = prompt('请输入约稿名称与价格，例如：“肖像 x1 — ¥300”', '');
      if (title) {
        const newEvent = { title, start: info.dateStr, allDay: true };
        calendar.addEvent(newEvent);
        storedEvents.push(newEvent);
        localStorage.setItem('commissions', JSON.stringify(storedEvents));
      }
    }
  });
  calendar.render();

});
