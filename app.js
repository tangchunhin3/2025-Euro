async function loadItinerary() {
  try {
    const res = await fetch('itinerary.json');
    const days = await res.json();

    const timeline = document.getElementById('timeline');
    const details = document.getElementById('details');

    function showDetails(day) {
      details.innerHTML = `
        <h2>第 ${day.day} 天 – ${day.city}（${day.country}）</h2>
        <div class="meta">
          <span class="badge">日期：${day.date}</span>
          <span class="badge">主題：${day.theme}</span>
          <span class="badge">酒店：${day.hotel}</span>
        </div>
        <div class="detail-block">
          <h3>行程重點</h3>
          <p>${day.plan}</p>
        </div>
        <div class="detail-block">
          <h3>交通建議</h3>
          <p>${day.transportTip}</p>
        </div>
        <div class="detail-block">
          <h3>餐廳／美食建議</h3>
          <p>${day.foodTip}</p>
        </div>
        <div class="detail-block">
          <h3>必做事項</h3>
          <p>${day.mustDo}</p>
        </div>
        <div class="detail-block">
          <h3>必買／伴手禮建議</h3>
          <p>${day.mustBuy}</p>
        </div>
        <div class="detail-block">
          <h3>預期天氣（平均氣候）</h3>
          <p>${day.weather}</p>
        </div>
      `;
    }

    days.forEach(day => {
      const btn = document.createElement('button');
      // 顯示：12/13 米蘭（第 1 天）
      const mmdd = day.date.substring(5).replace("-", "/");
      btn.textContent = `${mmdd} ${day.city}（第 ${day.day} 天）`;
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('#timeline button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showDetails(day);
      });
      timeline.appendChild(btn);
    });

    if (days.length > 0) {
      const firstBtn = timeline.querySelector('button');
      if (firstBtn) firstBtn.classList.add('active');
      showDetails(days[0]);
    }
  } catch (err) {
    document.getElementById('details').innerHTML =
      '<p>行程載入失敗，請確認 itinerary.json 是否存在且格式正確。</p>';
    console.error(err);
  }
}

loadItinerary();
