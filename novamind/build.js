/*
  NovaMind AI — Multi-page site generator
  Usage: node build.js
  Writes all 22 HTML pages to the novamind directory tree.
*/

const fs = require('fs');
const path = require('path');

const BASE = 'D:\\Ai\\测试文件\\novamind';
const dirs = ['', 'features', 'solutions', 'cases', 'company'];
dirs.forEach(d => {
  const p = path.join(BASE, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// ── Shared components ───────────────────────────────────────────────

const head = (title, extraMeta = '') => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — NovaMind AI</title>
  <meta name="description" content="NovaMind AI 企业级智能解决方案 — ${title}" />
  <meta name="keywords" content="AI解决方案,企业人工智能,大模型部署,智能风控,知识图谱,NovaMind" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0e1015" />
  ${extraMeta}
  <link rel="stylesheet" href="/assets/style.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'nova-deep': '#0e1015',
            'nova-dark': '#161920',
            'nova-card': '#1c2029',
            'nova-hover': '#222733',
            'nova-elev': '#282d3a',
            'nova-cyan': '#00d4aa',
            'nova-blue': '#4a9eff',
            'nova-muted': '#6b7280',
          }
        }
      }
    }
  </script>
  <script src="/assets/app.js" defer></script>
</head>
<body class="bg-nova-deep text-[#c8ccd4] antialiased">`;

const navbar = (active = '') => `
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 bg-nova-deep/85 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-500">
  <div class="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-0">
    <a href="/" class="text-lg font-bold text-[#e8eaed] flex items-center gap-2">Nova<span class="text-nova-cyan">Mind</span></a>
    <div class="hidden md:flex items-center gap-1">
      <a href="/" class="nav-link ${active==='home'?'active':''} px-3 py-2 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] rounded-md transition-all duration-350 relative">首页</a>
      <a href="/solutions/" class="nav-link ${active==='solutions'?'active':''} px-3 py-2 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] rounded-md transition-all duration-350 relative">解决方案</a>
      <a href="/features/" class="nav-link ${active==='features'?'active':''} px-3 py-2 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] rounded-md transition-all duration-350 relative">产品功能</a>
      <a href="/cases/" class="nav-link ${active==='cases'?'active':''} px-3 py-2 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] rounded-md transition-all duration-350 relative">案例展示</a>
      <a href="/company/about.html" class="nav-link ${active==='about'?'active':''} px-3 py-2 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] rounded-md transition-all duration-350 relative">技术团队</a>
      <a href="/company/contact.html" class="nav-cta ml-3 px-4 py-2 text-sm font-semibold text-nova-deep bg-nova-cyan hover:bg-[#00e8bc] hover:shadow-[0_0_24px_rgba(0,212,170,0.15)] rounded-md transition-all duration-350 hover:-translate-y-0.5">合作咨询</a>
    </div>
    <button id="hamburger" class="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer z-50 relative bg-transparent border-none" aria-label="菜单">
      <span class="block w-6 h-0.5 bg-[#9ca3af] rounded transition-all duration-300 origin-center"></span>
      <span class="block w-6 h-0.5 bg-[#9ca3af] rounded transition-all duration-300 origin-center"></span>
      <span class="block w-6 h-0.5 bg-[#9ca3af] rounded transition-all duration-300 origin-center"></span>
    </button>
  </div>
  <div id="mobileMenu" class="md:hidden overflow-hidden" style="max-height:0;transition:max-height 0.4s ease">
    <div class="flex flex-col gap-1 pb-4 px-2">
      <a href="/" class="block px-4 py-3 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] hover:bg-white/[0.03] rounded-md transition-all duration-350">首页</a>
      <a href="/solutions/" class="block px-4 py-3 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] hover:bg-white/[0.03] rounded-md transition-all duration-350">解决方案</a>
      <a href="/features/" class="block px-4 py-3 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] hover:bg-white/[0.03] rounded-md transition-all duration-350">产品功能</a>
      <a href="/cases/" class="block px-4 py-3 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] hover:bg-white/[0.03] rounded-md transition-all duration-350">案例展示</a>
      <a href="/company/about.html" class="block px-4 py-3 text-sm font-medium text-[#9ca3af] hover:text-[#e8eaed] hover:bg-white/[0.03] rounded-md transition-all duration-350">技术团队</a>
      <a href="/company/contact.html" class="block ml-2 mr-2 mt-1 px-4 py-3 text-sm font-semibold text-nova-deep bg-nova-cyan hover:bg-[#00e8bc] rounded-md transition-all text-center">合作咨询</a>
    </div>
  </div>
</nav>`;

const toast = '<div id="toast" class="toast"></div>';

const cta = (text = '立即预约演示', link = '/company/booking.html') => `
<section class="py-16 sm:py-20">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="bg-nova-card border border-white/[0.06] rounded-2xl p-10 sm:p-14 text-center reveal" style="background:linear-gradient(135deg,rgba(0,212,170,0.06),rgba(74,158,255,0.04))">
      <h2 class="text-2xl sm:text-3xl font-semibold text-[#e8eaed] mb-4">准备好开始智能升级了吗？</h2>
      <p class="text-[#9ca3af] mb-8 max-w-lg mx-auto">预约专属演示，我们的解决方案专家将在24小时内与您联系，为您量身定制AI落地策略。</p>
      <a href="${link}" class="inline-flex items-center gap-2 bg-nova-cyan text-nova-deep font-semibold px-8 py-3 rounded-md text-[0.95rem] transition-all duration-350 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.15)] hover:-translate-y-0.5">${text} →</a>
    </div>
  </div>
</section>`;

const footer = () => `
<footer class="bg-nova-deep border-t border-white/[0.06] pt-16 pb-8">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
      <div class="sm:col-span-2 lg:col-span-1">
        <div class="text-xl font-bold text-[#e8eaed] mb-4">Nova<span class="text-nova-cyan">Mind</span></div>
        <p class="text-sm text-[#6b7280] max-w-xs leading-relaxed mb-6">企业级人工智能解决方案提供商，致力于通过前沿AI技术赋能千行百业实现智能化升级。</p>
        <div class="flex gap-3">
          <a href="mailto:wujiashuaiwu492@gmail.com" class="w-9 h-9 rounded-md bg-nova-card border border-white/[0.06] flex items-center justify-center text-sm text-[#6b7280] transition-all duration-350 hover:bg-nova-cyan/10 hover:border-nova-cyan hover:text-nova-cyan hover:scale-110">✉</a>
          <a href="#" class="w-9 h-9 rounded-md bg-nova-card border border-white/[0.06] flex items-center justify-center text-sm text-[#6b7280] transition-all duration-350 hover:bg-nova-cyan/10 hover:border-nova-cyan hover:text-nova-cyan hover:scale-110">in</a>
          <a href="#" class="w-9 h-9 rounded-md bg-nova-card border border-white/[0.06] flex items-center justify-center text-sm text-[#6b7280] transition-all duration-350 hover:bg-nova-cyan/10 hover:border-nova-cyan hover:text-nova-cyan hover:scale-110">𝕏</a>
          <a href="#" class="w-9 h-9 rounded-md bg-nova-card border border-white/[0.06] flex items-center justify-center text-sm text-[#6b7280] transition-all duration-350 hover:bg-nova-cyan/10 hover:border-nova-cyan hover:text-nova-cyan hover:scale-110">GH</a>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-semibold text-[#e8eaed] uppercase tracking-wider mb-5">产品</h4>
        <div class="flex flex-col gap-2.5">
          <a href="/features/data-fusion.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">数据融合引擎</a>
          <a href="/features/model-platform.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">大模型推理平台</a>
          <a href="/features/knowledge-graph.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">行业知识图谱</a>
          <a href="/features/decision-engine.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">智能决策中枢</a>
          <a href="/features/automation.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">业务流程自动化</a>
          <a href="/features/ai-ops.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">AI运维监控台</a>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-semibold text-[#e8eaed] uppercase tracking-wider mb-5">行业</h4>
        <div class="flex flex-col gap-2.5">
          <a href="/solutions/fintech.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">金融服务</a>
          <a href="/solutions/healthcare.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">医疗健康</a>
          <a href="/solutions/manufacturing.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">智能制造</a>
          <a href="/solutions/retail.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">零售供应链</a>
          <a href="#" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">能源与公用</a>
        </div>
      </div>
      <div>
        <h4 class="text-sm font-semibold text-[#e8eaed] uppercase tracking-wider mb-5">关于</h4>
        <div class="flex flex-col gap-2.5">
          <a href="/company/about.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">公司简介</a>
          <a href="/company/about.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">技术团队</a>
          <a href="/company/contact.html" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">加入我们</a>
          <a href="mailto:wujiashuaiwu492@gmail.com" class="text-sm text-nova-cyan transition-all duration-350 hover:underline">联系合作</a>
          <a href="#" class="footer-link text-sm text-[#6b7280] transition-all duration-350 hover:text-nova-cyan">隐私政策</a>
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-white/[0.06] text-sm text-[#6b7280]">
      <span>© 2026 NovaMind AI. All rights reserved.</span>
      <span class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <a href="mailto:wujiashuaiwu492@gmail.com" class="text-nova-cyan hover:underline">wujiashuaiwu492@gmail.com</a>
        <span class="hidden sm:inline">|</span>
        <span>沪ICP备2024XXXXXXXX号</span>
      </span>
    </div>
  </div>
</footer>
</body>
</html>`;

const breadcrumb = (...crumbs) => {
  const parts = [{ label: '首页', href: '/' }];
  for (let i = 0; i < crumbs.length; i += 2) {
    parts.push({ label: crumbs[i], href: crumbs[i + 1] || null });
  }
  return `<div class="breadcrumbs max-w-[1280px] mx-auto px-4 sm:px-8 pt-28 pb-2 text-sm text-[#6b7280]">
    ${parts.map((c, i) => {
      if (i === parts.length - 1) return `<span class="text-nova-cyan">${c.label}</span>`;
      if (c.href) return `<a href="${c.href}" class="hover:text-nova-cyan transition">${c.label}</a> › `;
      return `<span>${c.label}</span> › `;
    }).join('')}
  </div>`;
};

const write = (relPath, content) => {
  const p = path.join(BASE, relPath);
  fs.writeFileSync(p, content, 'utf-8');
  console.log('  ✓', relPath);
};

// ═══════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════

// ── 1. HOME PAGE ──────────────────────────────────────────────────────

write('index.html', head('以 AI 驱动商业决策智能化') + navbar('home') + toast + `
<section class="relative min-h-screen flex items-center overflow-hidden bg-nova-deep pt-16" id="hero">
  <canvas id="hero-canvas"></canvas>
  <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 60% 50% at 30% 50%,rgba(0,212,170,0.06),transparent),radial-gradient(ellipse 40% 40% at 80% 30%,rgba(74,158,255,0.05),transparent)"></div>
  <div class="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-4 lg:pt-8">
    <div>
      <div class="inline-flex items-center gap-2 bg-nova-cyan/10 border border-nova-cyan/20 px-3 py-1.5 rounded-full text-sm font-medium text-nova-cyan mb-8"><span class="w-1.5 h-1.5 rounded-full bg-nova-cyan" style="animation:pulse-dot 2s infinite"></span>新一代企业智能平台</div>
      <h1 class="text-[clamp(2.5rem,5vw,4rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-4">以 AI 驱动<br><span class="bg-gradient-to-r from-nova-cyan to-nova-blue bg-clip-text text-transparent" id="typeTarget">商业决策智能化</span><span class="type-cursor" id="typeCursor"></span></h1>
      <p class="text-lg text-[#9ca3af] max-w-[520px] mb-10">NovaMind 企业级人工智能解决方案，将深度学习、知识图谱与行业know-how深度融合，助力企业实现从数据洞察到智能决策的完整闭环。</p>
      <div class="flex flex-wrap gap-4">
        <a href="/company/booking.html" class="inline-flex items-center gap-2 bg-nova-cyan text-nova-deep font-semibold px-8 py-3 rounded-md text-[0.95rem] transition-all duration-350 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.15)] hover:-translate-y-0.5">预约演示 →</a>
        <a href="/features/" class="inline-flex items-center gap-2 bg-transparent text-[#e8eaed] font-medium px-8 py-3 rounded-md text-[0.95rem] border border-white/[0.12] transition-all duration-350 hover:bg-nova-card hover:border-nova-cyan">了解更多</a>
      </div>
      <div class="grid grid-cols-3 gap-4 sm:gap-6 mt-12 pt-8 border-t border-white/[0.06]">
        <div class="stat-card p-3 rounded-lg transition-all duration-350 cursor-default hover:bg-white/[0.02] hover:-translate-y-1 border border-transparent">
          <span class="stat-num block text-xl sm:text-2xl font-bold text-[#e8eaed] transition-all duration-350" data-target="500">0</span>
          <span class="text-xs sm:text-sm text-[#6b7280] mt-0.5 block">服务企业数</span>
          <div class="stat-progress mt-2 h-1 rounded-full bg-[#282d3a] overflow-hidden"><span class="block h-full rounded-full bg-gradient-to-r from-nova-cyan to-nova-blue w-0 transition-all duration-1200"></span></div>
        </div>
        <div class="stat-card p-3 rounded-lg transition-all duration-350 cursor-default hover:bg-white/[0.02] hover:-translate-y-1 border border-transparent">
          <span class="stat-num block text-xl sm:text-2xl font-bold text-[#e8eaed] transition-all duration-350" data-target="97">0</span>
          <span class="text-xs sm:text-sm text-[#6b7280] mt-0.5 block">客户续约率 %</span>
          <div class="stat-progress mt-2 h-1 rounded-full bg-[#282d3a] overflow-hidden"><span class="block h-full rounded-full bg-gradient-to-r from-nova-cyan to-nova-blue w-0 transition-all duration-1200"></span></div>
        </div>
        <div class="stat-card p-3 rounded-lg transition-all duration-350 cursor-default hover:bg-white/[0.02] hover:-translate-y-1 border border-transparent">
          <span class="stat-num plus block text-xl sm:text-2xl font-bold text-[#e8eaed] transition-all duration-350" data-target="300">0</span>
          <span class="text-xs sm:text-sm text-[#6b7280] mt-0.5 block">专利技术数</span>
          <div class="stat-progress mt-2 h-1 rounded-full bg-[#282d3a] overflow-hidden"><span class="block h-full rounded-full bg-gradient-to-r from-nova-cyan to-nova-blue w-0 transition-all duration-1200"></span></div>
        </div>
      </div>
    </div>
    <div class="hidden lg:flex items-center justify-center min-h-[400px]">
      <div class="w-full max-w-[480px] aspect-square relative flex items-center justify-center" id="heroRings">
        <div class="hero-ring"><span class="dot"></span></div>
        <div class="hero-ring"><span class="dot"></span></div>
        <div class="hero-ring"><span class="dot"></span></div>
        <div class="w-20 h-20 rounded-full flex items-center justify-center text-3xl z-10 backdrop-blur-sm" style="background:radial-gradient(circle at 30% 30%,rgba(0,212,170,0.2),rgba(0,212,170,0.05));border:1px solid rgba(0,212,170,0.2)">✦</div>
      </div>
    </div>
  </div>
</section>

<!-- Features Preview -->
<section class="py-16 sm:py-24 bg-nova-dark">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="section-header reveal">
      <span class="section-label">核心功能</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-3">全栈智能 · 赋能业务增长</h2>
      <p class="text-lg text-[#9ca3af]">六大核心模块覆盖AI应用全生命周期，从数据处理到决策输出，为企业提供一站式智能升级方案。</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      ${[{icon:'◈',tag:'数据智能',title:'多源数据融合引擎',desc:'毫秒级接入结构化与非结构化数据，自动完成清洗、标注与特征工程。',href:'/features/data-fusion.html'},{icon:'◇',tag:'模型服务',title:'大模型推理平台',desc:'私有化部署LLM与多模态模型，端到端加密，确保企业数据安全合规。',href:'/features/model-platform.html'},{icon:'○',tag:'知识管理',title:'行业知识图谱',desc:'深度挖掘业务关联，构建领域专用知识图谱，让AI真正理解行业逻辑。',href:'/features/knowledge-graph.html'},{icon:'△',tag:'决策智能',title:'智能决策中枢',desc:'基于强化学习与因果推断，提供可解释的决策建议与模拟推演能力。',href:'/features/decision-engine.html'},{icon:'▽',tag:'自动化',title:'业务流程自动化',desc:'RPA+AI融合，自动化处理重复性业务流程，释放高价值人力资源。',href:'/features/automation.html'},{icon:'□',tag:'监控',title:'AI运维监控台',desc:'全链路模型监控与漂移检测，保障生产环境AI服务持续稳定可靠。',href:'/features/ai-ops.html'}].map((f,i) => `
      <a href="${f.href}" class="feature-card relative bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10 transition-all duration-350 cursor-pointer overflow-hidden reveal group hover:bg-nova-hover hover:border-nova-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]" style="transition-delay:${i*0.08}s">
        <div class="w-12 h-12 rounded-lg bg-nova-cyan/10 flex items-center justify-center text-lg transition-all duration-350 group-hover:bg-nova-cyan/20 group-hover:scale-110" style="color:#00d4aa">${f.icon}</div>
        <span class="inline-block text-[0.7rem] font-semibold tracking-wider uppercase text-nova-cyan mb-4 mt-5 transition-all duration-350 group-hover:text-[#00e8bc]">${f.tag}</span>
        <h3 class="text-lg font-semibold text-[#e8eaed] mb-2 transition-all duration-350 group-hover:text-white">${f.title}</h3>
        <p class="text-sm text-[#9ca3af] leading-relaxed transition-all duration-350 group-hover:text-[#c8ccd4]">${f.desc}</p>
      </a>`).join('')}
    </div>
</section>

<!-- Solutions Preview -->
<section class="py-16 sm:py-24 bg-nova-deep">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="section-header reveal">
      <span class="section-label">行业解决方案</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-3">深耕行业 · 定制化智能落地</h2>
      <p class="text-lg text-[#9ca3af]">针对不同行业核心痛点，已在金融、医疗、制造、零售等领域落地验证。</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      ${[{icon:'₿',title:'金融风控智能体',desc:'实时交易反欺诈、信用评估、智能合规审查',href:'/solutions/fintech.html'},{icon:'⚕',title:'医疗影像辅助诊断',desc:'CT/MRI/X光多模态AI分析，准确率98.7%',href:'/solutions/healthcare.html'},{icon:'⚙',title:'工业质检视觉系统',desc:'边缘端毫秒级缺陷检测，准确率99.5%',href:'/solutions/manufacturing.html'},{icon:'🛒',title:'零售智慧供应链',desc:'需求预测+智能补货+动态定价一体化',href:'/solutions/retail.html'}].map((s,i) => `
      <a href="${s.href}" class="bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10 text-center transition-all duration-350 reveal group hover:border-nova-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]" style="transition-delay:${i*0.1}s">
        <div class="w-14 h-14 rounded-xl bg-nova-cyan/10 flex items-center justify-center mx-auto mb-4 text-2xl transition-all duration-350 group-hover:bg-nova-cyan/20 group-hover:scale-110">${s.icon}</div>
        <h3 class="text-lg font-semibold text-[#e8eaed] mb-2 transition-all duration-350 group-hover:text-white">${s.title}</h3>
        <p class="text-sm text-[#9ca3af] leading-relaxed transition-all duration-350 group-hover:text-[#c8ccd4]">${s.desc}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- Cases Carousel (inline) -->
<section class="py-16 sm:py-24 bg-nova-dark overflow-hidden">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="section-header reveal">
      <span class="section-label">客户案例</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-3">行业标杆 · 实效见证</h2>
      <p class="text-lg text-[#9ca3af]">来自各行业领先企业的真实反馈，见证NovaMind AI带来的业务价值跃升。</p>
    </div>
    <div class="relative overflow-hidden -mx-3" id="casesCarousel">
      <div class="cases-track" id="casesTrack">
        ${[{q:'NovaMind的智能风控系统上线以来，我们的欺诈损失下降了67%，模型响应速度从秒级提升到毫秒级，真正做到了实时拦截。',n:'陈明远',r:'风控总监 · 兴业金融',init:'陈',res:'↑ 欺诈损失降低 67%',href:'/cases/case-1.html'},{q:'医疗影像AI辅助系统帮助我们的放射科医生将阅片效率提升了4倍，早期病变检出率提高了35%，改变了传统的诊断工作流。',n:'李文静',r:'副院长 · 仁和医疗集团',init:'李',res:'↑ 阅片效率提升 4×',href:'/cases/case-2.html'},{q:'工业质检系统上线后，我们的产线缺陷漏检率从3.2%降至0.08%，每年节约质检人力成本超过800万元。',n:'王建国',r:'生产总监 · 精工智造',init:'王',res:'↑ 缺陷漏检率降至 0.08%',href:'/cases/case-3.html'},{q:'供应链智能系统让我们在大促期间的库存周转天数缩短了40%，缺货率降低了52%，这是过去三年最好的运营数据。',n:'张雅婷',r:'供应链VP · 悦享零售',init:'张',res:'↑ 库存周转提升 40%',href:'/cases/case-4.html'},{q:'知识图谱平台将我们内部跨部门的查询响应时间从数天缩短到分钟级，员工自助获取信息的效率提升了12倍。',n:'赵思远',r:'CIO · 华远集团',init:'赵',res:'↑ 信息检索效率 12×',href:'/cases/case-5.html'}].map(c => `
        <a href="${c.href}" class="case-card bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10 transition-all duration-350 flex flex-col group hover:bg-nova-hover hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
          <div class="text-sm leading-relaxed text-[#9ca3af] flex-1 italic mb-7"><span class="block text-3xl text-nova-cyan font-bold leading-none not-italic mb-0 transition-all duration-350 group-hover:scale-110 group-hover:text-[#00e8bc]">&ldquo;</span>${c.q}</div>
          <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center font-semibold text-sm text-nova-deep shrink-0">${c.init}</div><div><span class="block text-sm font-semibold text-[#e8eaed]">${c.n}</span><span class="block text-xs text-[#6b7280] mt-0.5">${c.r}</span></div></div>
          <div class="inline-flex items-center gap-1 text-sm font-semibold text-nova-cyan mt-5 transition-all duration-350 group-hover:text-[#00e8bc]">${c.res}</div>
        </a>`).join('')}
      </div>
    </div>
    <div class="flex justify-center items-center gap-3 mt-10">
      <button id="carouselPrev" class="w-10 h-10 rounded-full border border-white/[0.06] bg-nova-card text-[#9ca3af] flex items-center justify-center cursor-pointer transition-all duration-350 hover:bg-nova-hover hover:border-nova-cyan hover:text-nova-cyan text-lg">‹</button>
      <div class="flex items-center gap-1.5" id="carouselDots"></div>
      <button id="carouselNext" class="w-10 h-10 rounded-full border border-white/[0.06] bg-nova-card text-[#9ca3af] flex items-center justify-center cursor-pointer transition-all duration-350 hover:bg-nova-hover hover:border-nova-cyan hover:text-nova-cyan text-lg">›</button>
    </div>
  </div>
</section>

<!-- Tech -->
<section class="py-16 sm:py-24 bg-nova-deep">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="section-header reveal">
      <span class="section-label">技术优势</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-3">硬核技术 · 构筑竞争壁垒</h2>
      <p class="text-lg text-[#9ca3af]">十年技术积累，多项核心专利，打造企业级AI基础设施的绝对优势。</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      ${[{num:'99.9%',label:'系统可用性',desc:'分布式架构设计，多活部署，保障企业级服务持续稳定运行',w:'99.9'},{num:'&lt;50ms',label:'推理延迟',desc:'模型推理引擎端到端延迟低于50ms，满足实时业务响应需求',w:'90'},{num:'10B+',label:'日处理Token数',desc:'每天处理超百亿级Token推理请求',w:'88'},{num:'SOC2',label:'安全合规认证',desc:'通过国际权威安全审计认证，金融级标准',w:'95'}].map((t,i) => `
      <div class="text-center p-8 sm:p-10 bg-nova-card border border-white/[0.06] rounded-xl transition-all duration-350 cursor-default hover:-translate-y-1.5 hover:border-white/[0.12] hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] reveal" style="transition-delay:${i*0.15}s">
        <div class="text-4xl font-bold bg-gradient-to-r from-nova-cyan to-nova-blue bg-clip-text text-transparent leading-none mb-2">${t.num}</div>
        <h3 class="text-base font-semibold text-[#e8eaed] mb-2">${t.label}</h3>
        <p class="text-sm text-[#9ca3af]">${t.desc}</p>
        <div class="tech-bar mt-5"><span data-width="${t.w}"></span></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Contact Preview -->
<section class="py-16 sm:py-24 bg-nova-dark">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
    <div class="section-header reveal">
      <span class="section-label">合作咨询</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-3">开启企业智能升级之旅</h2>
      <p class="text-lg text-[#9ca3af]">我们的解决方案专家将在24小时内与您联系。</p>
    </div>
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div class="reveal">
        <p class="text-[0.95rem] text-[#9ca3af]">无论您是正在探索AI落地的可能性，还是已有明确的应用场景，欢迎通过以下方式联系。</p>
        <div class="flex flex-col gap-5 mt-8">
          <div class="flex items-center gap-4"><div class="w-10 h-10 rounded-md bg-nova-cyan/10 flex items-center justify-center text-nova-cyan shrink-0">@</div><div class="flex-1 min-w-0"><span class="block text-sm font-medium text-[#e8eaed]">业务合作邮箱</span><div class="flex items-center gap-2"><a href="mailto:wujiashuaiwu492@gmail.com" class="text-nova-cyan hover:underline text-sm truncate">wujiashuaiwu492@gmail.com</a><button data-copy="wujiashuaiwu492@gmail.com" class="copy-btn w-6 h-6 rounded bg-white/[0.04] hover:bg-nova-cyan/20 flex items-center justify-center text-xs text-[#6b7280] hover:text-nova-cyan transition-all shrink-0">📋</button></div></div></div>
          <div class="flex items-center gap-4"><div class="w-10 h-10 rounded-md bg-nova-cyan/10 flex items-center justify-center text-nova-cyan shrink-0">◉</div><div class="flex-1 min-w-0"><span class="block text-sm font-medium text-[#e8eaed]">咨询热线</span><div class="flex items-center gap-2"><span class="text-sm">400-8820-NOVA</span><button data-copy="400-8820-NOVA" class="copy-btn w-6 h-6 rounded bg-white/[0.04] hover:bg-nova-cyan/20 flex items-center justify-center text-xs text-[#6b7280] hover:text-nova-cyan transition-all shrink-0">📋</button></div></div></div>
          <div class="flex items-center gap-4"><div class="w-10 h-10 rounded-md bg-nova-cyan/10 flex items-center justify-center text-nova-cyan shrink-0">⌂</div><div><span class="block text-sm font-medium text-[#e8eaed]">公司地址</span><span class="text-sm">上海市浦东新区张江人工智能岛</span></div></div>
        </div>
      </div>
      <form id="contactForm" class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-10 flex flex-col gap-5 reveal reveal-delay-2">
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">姓名 <span class="text-red-400">*</span></label><input type="text" name="name" placeholder="请输入姓名" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">职位</label><input type="text" name="title" placeholder="请输入职位" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">企业邮箱 <span class="text-red-400">*</span></label><input type="email" name="email" placeholder="you@company.com" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">公司名称</label><input type="text" name="company" placeholder="请输入公司名称" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        </div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">感兴趣的方向</label><select name="interest" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]"><option value="">请选择</option><option>大模型私有化部署</option><option>智能风控解决方案</option><option>医疗影像AI诊断</option><option>工业视觉质检</option><option>供应链智能优化</option><option>其他</option></select></div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">需求描述</label><textarea name="message" placeholder="请简要描述您的业务场景与需求……" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)] resize-vertical min-h-[100px]"></textarea></div>
        <div class="flex gap-3">
          <button type="submit" id="contactBtn" class="flex-1 inline-flex items-center justify-center gap-2 bg-nova-cyan text-nova-deep font-semibold px-8 py-3 rounded-md text-[0.95rem] transition-all duration-350 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.15)]"><span id="contactBtnText">提交咨询 →</span><span id="contactBtnSpinner" class="hidden w-4 h-4 border-2 border-nova-deep border-t-transparent rounded-full animate-spin"></span></button>
          <button type="reset" class="px-6 py-3 text-sm font-medium text-[#9ca3af] bg-transparent border border-white/[0.08] rounded-md transition-all duration-350 hover:bg-white/[0.03] hover:text-[#e8eaed]">重置</button>
        </div>
      </form>
    </div>
  </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas)return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,canvas.clientWidth/canvas.clientHeight,0.1,1000);
  const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setSize(canvas.clientWidth,canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  const nodes=[];const N=120;
  for(let i=0;i<N;i++){const r=5+Math.random()*10,theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);nodes.push({x:r*Math.sin(phi)*Math.cos(theta),y:r*Math.sin(phi)*Math.sin(theta),z:r*Math.cos(phi),vx:(Math.random()-0.5)*0.003,vy:(Math.random()-0.5)*0.003,vz:(Math.random()-0.5)*0.003})}
  const pos=new Float32Array(N*3);
  const nodeGeo=new THREE.BufferGeometry();nodeGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const nodeMat=new THREE.PointsMaterial({size:0.12,color:0x00d4aa,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending,sizeAttenuation:true});
  const nodeMesh=new THREE.Points(nodeGeo,nodeMat);scene.add(nodeMesh);
  const edgeMat=new THREE.LineBasicMaterial({color:0x00d4aa,transparent:true,opacity:0.08,blending:THREE.AdditiveBlending});
  let edgeMesh=new THREE.LineSegments(new THREE.BufferGeometry(),edgeMat);scene.add(edgeMesh);
  function ue(){const pairs=[];for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,dz=nodes[i].z-nodes[j].z;if(Math.sqrt(dx*dx+dy*dy+dz*dz)<3.3)pairs.push([i,j])}const v=[];for(const[i,j]of pairs){v.push(nodes[i].x,nodes[i].y,nodes[i].z,nodes[j].x,nodes[j].y,nodes[j].z)}if(!v.length){edgeMesh.visible=false;return}edgeMesh.visible=true;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));edgeMesh.geometry.dispose();edgeMesh.geometry=g}
  ue();camera.position.set(0,1,16);camera.lookAt(0,0,0);
  let mx=0,my=0,t=0;document.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-0.5)*2;my=(e.clientY/window.innerHeight-0.5)*2});
  function an(){requestAnimationFrame(an);t+=0.003;for(const n of nodes){n.x+=n.vx;n.y+=n.vy;n.z+=n.vz;const r=Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z);if(r>12||r<4){n.vx*=-1;n.vy*=-1;n.vz*=-1}}const p=nodeMesh.geometry.attributes.position.array;for(let i=0;i<N;i++){p[i*3]=nodes[i].x;p[i*3+1]=nodes[i].y;p[i*3+2]=nodes[i].z}nodeMesh.geometry.attributes.position.needsUpdate=true;ue();nodeMesh.rotation.y+=0.0006;nodeMesh.rotation.x=Math.sin(t*0.2)*0.05+my*0.03;nodeMesh.rotation.z=Math.cos(t*0.15)*0.03+mx*0.02;renderer.render(scene,camera)}an();
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()},200)});
})();
// Typewriter
(function(){const t=document.getElementById('typeTarget'),c=document.getElementById('typeCursor');if(!t)return;const txt=t.textContent;t.textContent='';let i=0;const ti=setInterval(()=>{t.textContent+=txt[i];i++;if(i>=txt.length){clearInterval(ti);c.style.display='none'}},120)})();
// Carousel
(function(){const tr=document.getElementById('casesTrack'),d=document.getElementById('carouselDots'),p=document.getElementById('carouselPrev'),n=document.getElementById('carouselNext');if(!tr)return;const cards=tr.querySelectorAll('.case-card');let idx=0,auto;function gv(){return window.innerWidth<769?1:window.innerWidth<1025?2:3}function tot(){return Math.max(0,cards.length-gv())}function rn(){const m=tot();if(idx>m)idx=m;tr.style.transform='translateX('+(-idx*(100/gv()))+'%)';d.innerHTML='';for(let i=0;i<=m;i++){const s=document.createElement('span');s.className='w-2 h-2 rounded-full cursor-pointer transition-all duration-350 '+(i===idx?'bg-nova-cyan w-6 !rounded-sm':'bg-[#282d3a]');s.addEventListener('click',()=>{idx=i;rn()});d.appendChild(s)}}p.addEventListener('click',()=>{idx=Math.max(0,idx-1);rn()});n.addEventListener('click',()=>{idx=Math.min(tot(),idx+1);rn()});function sa(){auto=setInterval(()=>{idx=(idx>=tot()?0:idx+1);rn()},5000)}sa();const carousel=document.getElementById('casesCarousel');carousel.addEventListener('mouseenter',()=>clearInterval(auto));carousel.addEventListener('mouseleave',sa);window.addEventListener('resize',rn);rn()})();
</script>
` + footer());

// ── 2. FEATURES INDEX ─────────────────────────────────────────────────

write('features/index.html', head('产品功能') + navbar('features') + toast + breadcrumb('产品功能', '/features/') + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">产品功能</span>
    <h1>全栈智能 · 赋能业务增长</h1>
    <p>六大核心模块覆盖AI应用全生命周期，单击任一模块了解详情。</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-deep">
  <div class="container">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      ${[{icon:'◈',tag:'数据智能',title:'多源数据融合引擎',desc:'毫秒级接入结构化与非结构化数据，自动完成清洗、标注与特征工程。',href:'/features/data-fusion.html'},{icon:'◇',tag:'模型服务',title:'大模型推理平台',desc:'私有化部署LLM与多模态模型，端到端加密，确保企业数据安全合规。',href:'/features/model-platform.html'},{icon:'○',tag:'知识管理',title:'行业知识图谱',desc:'深度挖掘业务关联，构建领域专用知识图谱。',href:'/features/knowledge-graph.html'},{icon:'△',tag:'决策智能',title:'智能决策中枢',desc:'强化学习与因果推断，可解释的决策建议与模拟推演。',href:'/features/decision-engine.html'},{icon:'▽',tag:'自动化',title:'业务流程自动化',desc:'RPA+AI融合，自动化处理重复性业务流程。',href:'/features/automation.html'},{icon:'□',tag:'监控',title:'AI运维监控台',desc:'全链路模型监控与漂移检测，保障AI服务稳定。',href:'/features/ai-ops.html'}].map((f,i) => `
      <a href="${f.href}" class="feature-card relative bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10 transition-all duration-350 cursor-pointer overflow-hidden reveal group hover:bg-nova-hover hover:border-nova-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]" style="transition-delay:${i*0.08}s">
        <div class="w-12 h-12 rounded-lg bg-nova-cyan/10 flex items-center justify-center text-lg transition-all duration-350 group-hover:bg-nova-cyan/20 group-hover:scale-110" style="color:#00d4aa">${f.icon}</div>
        <span class="inline-block text-[0.7rem] font-semibold tracking-wider uppercase text-nova-cyan mb-4 mt-5 transition-all duration-350 group-hover:text-[#00e8bc]">${f.tag}</span>
        <h3 class="text-lg font-semibold text-[#e8eaed] mb-2 transition-all duration-350 group-hover:text-white">${f.title}</h3>
        <p class="text-sm text-[#9ca3af] leading-relaxed transition-all duration-350 group-hover:text-[#c8ccd4]">${f.desc}</p>
      </a>`).join('')}
    </div>
  </div>
</section>
` + cta() + footer());

// ── 3-8. FEATURE DETAIL PAGES ───────────────────────────────────────

const featurePages = [
  {
    file: 'features/data-fusion.html', tag: '数据智能', title: '多源数据融合引擎',
    core: '一站式多源异构数据融合——让沉睡的数据资产即刻为AI所用。',
    adv: ['毫秒级实时数据接入','支持500+数据源连接器','自动数据清洗与异常检测','智能特征工程与变量衍生','流批一体数据处理架构','可视化数据管道编排'],
    ind: ['金融风控数据中台','医疗多模态数据治理','工业IoT传感器融合','零售全渠道数据整合'],
    cas: [{m:'数据接入延迟＜10ms',d:'某大型银行数据中台项目'},{m:'数据治理效率提升8×',d:'某三甲医院临床数据平台'}],
    mods: ['/features/model-platform.html','/features/decision-engine.html','/features/automation.html']
  },
  {
    file: 'features/model-platform.html', tag: '模型服务', title: '大模型推理平台',
    core: '企业级大模型私有化部署——安全、可控、高性能的AI推理基础设施。',
    adv: ['支持主流开源&商用模型','端到端数据加密传输','动态GPU资源调度','模型版本管理与A/B测试','99.9%服务可用性SLA','弹性伸缩与成本优化'],
    ind: ['金融合规文档智能审核','医疗病历智能摘要生成','工业设备故障知识问答','零售智能客服与导购'],
    cas: [{m:'推理延迟＜30ms',d:'某头部券商智能研报系统'},{m:'日均处理50亿+Token',d:'某跨国零售集团客服平台'}],
    mods: ['/features/data-fusion.html','/features/decision-engine.html','/features/ai-ops.html']
  },
  {
    file: 'features/knowledge-graph.html', tag: '知识管理', title: '行业知识图谱',
    core: '从数据到知识——构建机器可理解的行业专家系统。',
    adv: ['领域本体自动构建','千万级实体关系推理','动态知识增量更新','多跳推理问答引擎','可视化图谱探索工具','知识冲突检测与消解'],
    ind: ['金融产业链知识网络','医疗疾病-药物知识库','工业设备故障知识图谱','零售商品知识关联网络'],
    cas: [{m:'知识覆盖100万+实体',d:'某大型保险集团知识中台'},{m:'查询响应提速20×',d:'某工业企业设备知识管理平台'}],
    mods: ['/features/model-platform.html','/features/decision-engine.html','/features/data-fusion.html']
  },
  {
    file: 'features/decision-engine.html', tag: '决策智能', title: '智能决策中枢',
    core: '从洞察到行动——让每一个商业决策都有AI驱动的数据支撑。',
    adv: ['因果推断与反事实分析','多目标优化决策引擎','可解释AI决策路径','策略模拟与沙盘推演','实时决策效果归因','决策知识库自动沉淀'],
    ind: ['金融信贷审批决策','供应链库存优化决策','产线排程优化决策','零售动态定价决策'],
    cas: [{m:'信贷审批效率提升6×',d:'某商业银行智能风控决策系统'},{m:'库存成本降低18%',d:'某大型制造企业供应链优化'}],
    mods: ['/features/data-fusion.html','/features/model-platform.html','/features/automation.html']
  },
  {
    file: 'features/automation.html', tag: '自动化', title: '业务流程自动化',
    core: '让AI替你跑流程——端到端智能自动化，释放团队创造力。',
    adv: ['AI+RPA深度融合','自然语言流程编排','智能异常处理与重试','跨系统无缝集成','流程效能实时看板','低代码流程设计器'],
    ind: ['财务对账与报销自动化','人事入职与考勤自动化','IT运维工单自动化','合规审查流程自动化'],
    cas: [{m:'人工处理时间减少85%',d:'某上市集团财务共享中心'},{m:'年节约工时12万+小时',d:'某金融机构合规审查部'}],
    mods: ['/features/ai-ops.html','/features/decision-engine.html','/features/data-fusion.html']
  },
  {
    file: 'features/ai-ops.html', tag: '监控', title: 'AI运维监控台',
    core: 'AI也需要运维——全链路可观测，让每一次推理都在掌控之中。',
    adv: ['模型性能实时监控','数据漂移自动检测','推理质量多维评估','异常告警与自愈机制','全链路调用链追踪','多集群统一管理'],
    ind: ['金融模型稳定性监控','医疗AI诊断质量监控','工业视觉模型漂移检测','推荐系统效果实时评估'],
    cas: [{m:'故障发现时间＜1分钟',d:'某大型银行AI模型运维平台'},{m:'模型可用性99.99%',d:'某电商平台推荐系统监控'}],
    mods: ['/features/model-platform.html','/features/automation.html','/features/data-fusion.html']
  }
];

featurePages.forEach(fp => {
  write(fp.file, head(fp.title) + navbar('features') + toast + breadcrumb('产品功能', '/features/', fp.title, fp.file) + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">${fp.tag}</span>
    <h1>${fp.title}</h1>
    <p>${fp.core}</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-dark">
  <div class="container">
    <div class="bg-nova-card border border-white/[0.06] rounded-2xl p-8 sm:p-10 mb-12 reveal">
      <span class="text-xs font-semibold tracking-widest uppercase text-nova-cyan">核心价值</span>
      <p class="text-2xl sm:text-3xl font-semibold text-[#e8eaed] mt-3 leading-relaxed">${fp.core}</p>
    </div>

    <div class="mb-16">
      <span class="section-label">技术优势</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8">核心技术能力</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        ${fp.adv.map((a,i) => `
        <div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1" style="transition-delay:${i*0.08}s">
          <div class="w-10 h-10 rounded-lg bg-nova-cyan/10 flex items-center justify-center text-nova-cyan text-sm mb-3 font-bold">✓</div>
          <h3 class="text-[#e8eaed] font-medium mb-1">${a}</h3>
          <p class="text-xs text-[#6b7280]">企业级生产验证</p>
        </div>`).join('')}
      </div>
    </div>

    <div class="mb-16">
      <span class="section-label">适配行业</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8">行业应用场景</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        ${fp.ind.map((ind,i) => `
        <div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 text-center reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1" style="transition-delay:${i*0.1}s">
          <div class="w-12 h-12 rounded-lg bg-nova-cyan/10 flex items-center justify-center text-xl mx-auto mb-3">${['🏦','🏥','🏭','🛒'][i]||'📊'}</div>
          <h3 class="text-[#e8eaed] font-medium">${ind}</h3>
        </div>`).join('')}
      </div>
    </div>

    <div class="mb-16">
      <span class="section-label">落地案例</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8">客户实践</h2>
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
        ${fp.cas.map((c,i) => `
        <div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1" style="transition-delay:${i*0.15}s">
          <p class="text-lg font-semibold text-[#e8eaed] mb-2">${c.m}</p>
          <p class="text-sm text-[#6b7280]">${c.d}</p>
        </div>`).join('')}
      </div>
    </div>

    <div class="flex flex-wrap gap-3 mb-12">
      <span class="text-sm text-[#6b7280] self-center">适配功能模块：</span>
      ${fp.mods.map(m => `<a href="${m}" class="tag">${m.split('features/')[1]?.replace('.html','')||m}</a>`).join('')}
    </div>
  </div>
</section>
` + cta() + footer());
});

// ── 9. SOLUTIONS INDEX ───────────────────────────────────────────────

write('solutions/index.html', head('行业解决方案') + navbar('solutions') + toast + breadcrumb('解决方案', '/solutions/') + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">行业解决方案</span>
    <h1>深耕行业 · 定制化智能落地</h1>
    <p>针对不同行业核心痛点，已在金融、医疗、制造、零售等领域落地验证。</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-deep">
  <div class="container">
    <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
      ${[{icon:'₿',title:'金融风控智能体',desc:'实时交易反欺诈、信用评估模型、智能合规审查，降低坏账率42%，提升审批效率6倍。',tags:['反欺诈','信用评分','智能合规'],href:'/solutions/fintech.html',bg:'rgba(0,212,170,0.08)'},{icon:'⚕',title:'医疗影像辅助诊断',desc:'基于深度学习的医学影像分析系统，覆盖CT、MRI、X光多模态，辅助诊断准确率98.7%。',tags:['影像分析','辅助诊断','病理筛查'],href:'/solutions/healthcare.html',bg:'rgba(74,158,255,0.08)'},{icon:'⚙',title:'工业质检视觉系统',desc:'边缘端部署的工业视觉AI，毫秒级缺陷检测，准确率超99.5%，降低人力检测成本70%。',tags:['缺陷检测','边缘计算','实时监控'],href:'/solutions/manufacturing.html',bg:'rgba(0,212,170,0.06)'},{icon:'🛒',title:'零售智慧供应链',desc:'需求预测+智能补货+动态定价一体化，库存周转率提升35%，缺货率下降52%。',tags:['需求预测','智能补货','动态定价'],href:'/solutions/retail.html',bg:'rgba(74,158,255,0.06)'}].map((s,i) => `
      <a href="${s.href}" class="solution-card rounded-xl overflow-hidden bg-nova-card border border-white/[0.06] transition-all duration-350 flex flex-col group hover:border-nova-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] reveal" style="transition-delay:${i*0.12}s">
        <div class="h-[140px] flex items-center justify-center relative overflow-hidden" style="background:linear-gradient(135deg,${s.bg},transparent)"><span class="text-5xl absolute transition-all duration-500 group-hover:scale-125" style="opacity:0.08;color:#00d4aa">${s.icon}</span></div>
        <div class="p-6 sm:p-8 flex-1 flex flex-col">
          <h3 class="text-lg font-semibold text-[#e8eaed] mb-2 transition-all duration-350 group-hover:text-white">${s.title}</h3>
          <p class="text-sm text-[#9ca3af] leading-relaxed flex-1 mb-5">${s.desc}</p>
          <div class="flex gap-2 flex-wrap">${s.tags.map(t => `<span class="text-xs px-2.5 py-1 rounded-full bg-nova-cyan/10 text-nova-cyan font-medium border border-transparent transition-all duration-350 group-hover:border-nova-cyan/20">${t}</span>`).join('')}</div>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>
` + cta() + footer());

// ── 10-13. SOLUTION DETAIL PAGES ─────────────────────────────────────

const solutionPages = [
  {
    file:'solutions/fintech.html',icon:'₿',title:'金融风控智能体',sub:'实时交易反欺诈 · 信用评估模型 · 智能合规审查',
    pain:'金融行业面临交易欺诈频发、信用评估滞后、合规审查成本高企等核心痛点。传统规则引擎难以应对复杂多变的欺诈手段，人工审核效率低下，亟需AI驱动的智能风控体系。',
    flow:['多维数据采集','实时特征工程','多模型集成推理','智能决策输出','效果归因迭代'],
    res:[{v:'降低42%',l:'坏账率'},{v:'提升6倍',l:'审批效率'},{v:'99.7%',l:'欺诈拦截率'}],
    mods:['/features/data-fusion.html','/features/model-platform.html','/features/decision-engine.html','/features/automation.html'],
    bg:'rgba(0,212,170,0.08)'
  },
  {
    file:'solutions/healthcare.html',icon:'⚕',title:'医疗影像辅助诊断',sub:'CT · MRI · X光多模态AI分析',
    pain:'医疗影像诊断依赖资深医生经验，基层医院专业人才匮乏，诊断效率瓶颈突出。AI辅助可大幅缩短阅片时间，提高早期病变检出率，缓解医疗资源不均衡问题。',
    flow:['DICOM影像接入','影像预处理','多模态AI推理','结构化报告生成','医生审核确认'],
    res:[{v:'98.7%',l:'辅助诊断准确率'},{v:'提升4倍',l:'阅片效率'},{v:'+35%',l:'早期病变检出率'}],
    mods:['/features/data-fusion.html','/features/model-platform.html','/features/knowledge-graph.html','/features/ai-ops.html'],
    bg:'rgba(74,158,255,0.08)'
  },
  {
    file:'solutions/manufacturing.html',icon:'⚙',title:'工业质检视觉系统',sub:'边缘端部署 · 毫秒级缺陷检测',
    pain:'传统工业质检依赖人眼目检，效率低、一致性差、人力成本高昂。AI视觉系统可在毫秒级完成高精度缺陷检测，实现产线全自动化质量管控。',
    flow:['工业相机采集','边缘端预处理','缺陷检测推理','实时结果输出','质量数据汇聚'],
    res:[{v:'>99.5%',l:'检测准确率'},{v:'降低70%',l:'人力成本'},{v:'<0.08%',l:'漏检率'}],
    mods:['/features/model-platform.html','/features/automation.html','/features/ai-ops.html','/features/data-fusion.html'],
    bg:'rgba(0,212,170,0.06)'
  },
  {
    file:'solutions/retail.html',icon:'🛒',title:'零售智慧供应链',sub:'需求预测 · 智能补货 · 动态定价',
    pain:'零售行业面临需求波动大、库存成本高、缺货与积压并存等供应链管理难题。AI驱动的预测与优化系统，可实现从需求感知到自动补货、动态定价的完整闭环。',
    flow:['多源数据融合','需求预测模型','智能补货引擎','动态定价策略','全链路监控'],
    res:[{v:'提升35%',l:'库存周转率'},{v:'降低52%',l:'缺货率'},{v:'92%',l:'预测准确率'}],
    mods:['/features/data-fusion.html','/features/decision-engine.html','/features/automation.html','/features/model-platform.html'],
    bg:'rgba(74,158,255,0.06)'
  }
];

solutionPages.forEach(sp => {
  write(sp.file, head(sp.title) + navbar('solutions') + toast + breadcrumb('解决方案', '/solutions/', sp.title, sp.file) + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">行业解决方案</span>
    <h1>${sp.title}</h1>
    <p>${sp.sub}</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-dark">
  <div class="container">
    <!-- Pain Points -->
    <div class="bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10 mb-8 reveal" style="background:linear-gradient(135deg,${sp.bg},transparent)">
      <span class="text-xs font-semibold tracking-widest uppercase text-nova-cyan">业务痛点</span>
      <p class="text-[#e8eaed] mt-3 leading-relaxed">${sp.pain}</p>
    </div>

    <!-- Solution Flow -->
    <div class="mb-12 reveal">
      <span class="section-label">解决方案流程</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8">端到端智能流程</h2>
      <div class="flex flex-wrap items-center gap-2 sm:gap-3">
        ${sp.flow.map((f,i) => `
        ${i>0?'<span class="text-nova-cyan text-lg font-bold">→</span>':''}
        <div class="bg-nova-cyan/10 border border-nova-cyan/20 rounded-lg px-4 py-3 text-sm text-nova-cyan text-center font-medium flex-1 min-w-[120px]">${f}</div>
        ${i===2?'<span class="w-full hidden sm:block"></span>':''}
        `).join('')}
      </div>
    </div>

    <!-- Results -->
    <div class="mb-12 reveal">
      <span class="section-label">落地效果</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8">量化业务价值</h2>
      <div class="grid grid-cols-3 gap-4 sm:gap-6">
        ${sp.res.map(r => `<div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-8 text-center reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1"><div class="text-2xl sm:text-3xl font-bold text-nova-cyan mb-2">${r.v}</div><div class="text-sm text-[#6b7280]">${r.l}</div></div>`).join('')}
      </div>
    </div>

    <!-- Compatible Modules -->
    <div class="flex flex-wrap gap-3 reveal">
      <span class="text-sm text-[#6b7280] self-center">适配功能模块：</span>
      ${sp.mods.map(m => {
        const names = {'data-fusion':'数据融合引擎','model-platform':'大模型推理平台','knowledge-graph':'行业知识图谱','decision-engine':'智能决策中枢','automation':'流程自动化','ai-ops':'AI运维监控'};
        const key = m.split('features/')[1]?.replace('.html','')||'';
        return `<a href="${m}" class="tag">${names[key]||key}</a>`;
      }).join('')}
    </div>
  </div>
</section>
` + cta() + footer());
});

// ── 14. CASES INDEX ──────────────────────────────────────────────────

write('cases/index.html', head('案例展示') + navbar('cases') + toast + breadcrumb('案例展示', '/cases/') + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">客户案例</span>
    <h1>行业标杆 · 实效见证</h1>
    <p>来自各行业领先企业的真实反馈，见证NovaMind AI带来的业务价值跃升。</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-deep">
  <div class="container">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      ${[{q:'NovaMind的智能风控系统上线以来，我们的欺诈损失下降了67%，模型响应速度从秒级提升到毫秒级。',n:'陈明远',r:'风控总监 · 兴业金融',init:'陈',res:'↑ 欺诈损失降低 67%',href:'/cases/case-1.html'},{q:'医疗影像AI辅助系统帮助放射科医生将阅片效率提升了4倍，早期病变检出率提高了35%。',n:'李文静',r:'副院长 · 仁和医疗集团',init:'李',res:'↑ 阅片效率提升 4×',href:'/cases/case-2.html'},{q:'工业质检系统上线后，产线缺陷漏检率从3.2%降至0.08%，每年节约质检人力成本超800万元。',n:'王建国',r:'生产总监 · 精工智造',init:'王',res:'↑ 漏检率降至 0.08%',href:'/cases/case-3.html'},{q:'供应链智能系统让我们在大促期间库存周转天数缩短了40%，缺货率降低了52%。',n:'张雅婷',r:'供应链VP · 悦享零售',init:'张',res:'↑ 库存周转提升 40%',href:'/cases/case-4.html'},{q:'知识图谱平台将内部跨部门查询响应时间从数天缩短到分钟级，效率提升12倍。',n:'赵思远',r:'CIO · 华远集团',init:'赵',res:'↑ 信息检索效率 12×',href:'/cases/case-5.html'}].map((c,i) => `
      <a href="${c.href}" class="bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10 transition-all duration-350 flex flex-col reveal group hover:bg-nova-hover hover:border-nova-cyan/40 hover:-translate-y-1.5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)]" style="transition-delay:${i*0.1}s">
        <div class="text-sm leading-relaxed text-[#9ca3af] flex-1 italic mb-7"><span class="block text-3xl text-nova-cyan font-bold leading-none not-italic mb-0 transition-all duration-350 group-hover:scale-110">&ldquo;</span>${c.q}</div>
        <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center font-semibold text-sm text-nova-deep shrink-0">${c.init}</div><div><span class="block text-sm font-semibold text-[#e8eaed]">${c.n}</span><span class="block text-xs text-[#6b7280] mt-0.5">${c.r}</span></div></div>
        <div class="inline-flex items-center gap-1 text-sm font-semibold text-nova-cyan mt-5 transition-all duration-350 group-hover:text-[#00e8bc]">${c.res}</div>
      </a>`).join('')}
    </div>
  </div>
</section>
` + cta() + footer());

// ── 15-19. CASE DETAIL PAGES ────────────────────────────────────────

const casePages = [
  {
    file:'cases/case-1.html',org:'兴业金融',title:'智能风控系统',quote:'欺诈损失下降67%，模型响应从秒级到毫秒级',
    bg:'兴业金融是国内中型商业银行，日均交易量超500万笔。传统规则引擎误报率高，人工审核效率低，风控成本居高不下。',
    sol:'部署多源数据融合引擎 + 大模型推理平台 + 智能决策中枢，构建实时风控决策体系。实现交易毫秒级风险评估，多维特征实时计算，模型自动迭代优化。',
    res:[{v:'降低67%',l:'欺诈损失'},{v:'提升6倍',l:'审批效率'},{v:'降低82%',l:'误报率'}],
    person:'陈明远',role:'风控总监',testimonial:'NovaMind的智能风控系统上线以来，我们的欺诈损失下降了67%，模型响应速度从秒级提升到毫秒级，真正做到了实时拦截。过去需要人工审核的复杂案例现在系统自动处理，风控团队可以将精力集中在策略优化上。',
    related:['/cases/case-2.html','/cases/case-3.html']
  },
  {
    file:'cases/case-2.html',org:'仁和医疗集团',title:'医学影像AI辅助诊断',quote:'阅片效率提升4倍，早期病变检出率提高35%',
    bg:'仁和医疗拥有12家分院，放射科日均阅片量巨大，资深医生紧缺。不同院区诊断水平参差不齐，患者等待时间长。',
    sol:'部署多模态AI推理 + 知识图谱辅助诊断 + AI运维监控台，实现全院影像智能分析。覆盖CT、MRI、X光多模态，自动生成结构化报告。',
    res:[{v:'提升4倍',l:'阅片效率'},{v:'98.7%',l:'诊断准确率'},{v:'+45%',l:'医生工作满意度'}],
    person:'李文静',role:'副院长',testimonial:'医疗影像AI辅助系统帮助我们的放射科医生将阅片效率提升了4倍，早期病变检出率提高了35%，改变了传统的诊断工作流。尤其是在基层院区，AI辅助让年轻医生的诊断水平显著提升。',
    related:['/cases/case-1.html','/cases/case-4.html']
  },
  {
    file:'cases/case-3.html',org:'精工智造',title:'工业视觉质检系统',quote:'缺陷漏检率从3.2%降至0.08%，年节约成本800万',
    bg:'精工智造是国内精密零部件龙头企业，传统人工目检效率低、一致性差，漏检率高达3.2%，导致客户投诉与退货损失巨大。',
    sol:'部署边缘端AI视觉系统 + 缺陷检测模型 + 实时质量监控台，实现产线全自动化质检。支持多角度、多光源检测，毫秒级判定。',
    res:[{v:'<0.08%',l:'漏检率'},{v:'800万+',l:'年节约成本'},{v:'10倍',l:'检测速度'}],
    person:'王建国',role:'生产总监',testimonial:'工业质检系统上线后，我们的产线缺陷漏检率从3.2%降至0.08%，每年节约质检人力成本超过800万元。产线良品率大幅提升，客户投诉几乎归零。',
    related:['/cases/case-2.html','/cases/case-5.html']
  },
  {
    file:'cases/case-4.html',org:'悦享零售',title:'智慧供应链优化',quote:'库存周转天数缩短40%，缺货率降低52%',
    bg:'悦享零售拥有2000+门店，大促期间库存管理压力巨大。需求预测不准导致畅销品缺货、滞销品积压，供应链成本居高不下。',
    sol:'部署需求预测模型 + 智能补货引擎 + 动态定价策略，实现全链路供应链智能化。融合销售、库存、天气、社交等多源数据，精准预测需求。',
    res:[{v:'缩短40%',l:'库存周转天数'},{v:'降低52%',l:'缺货率'},{v:'+3.2%',l:'毛利率'}],
    person:'张雅婷',role:'供应链VP',testimonial:'供应链智能系统让我们在大促期间的库存周转天数缩短了40%，缺货率降低了52%，这是过去三年最好的运营数据。',
    related:['/cases/case-1.html','/cases/case-5.html']
  },
  {
    file:'cases/case-5.html',org:'华远集团',title:'企业知识图谱平台',quote:'查询响应从数天缩短到分钟级，效率提升12倍',
    bg:'华远集团是大型多元化控股企业，业务遍布能源、地产、金融等多个领域。内部信息系统孤岛严重，跨部门信息查询耗时数天，严重影响决策效率。',
    sol:'部署行业知识图谱构建 + 多跳推理问答引擎 + 可视化图谱探索工具，构建企业级知识底座。自动抽取业务实体与关系，打通200+系统数据孤岛。',
    res:[{v:'100万+',l:'知识实体覆盖'},{v:'12倍',l:'查询效率提升'},{v:'85%',l:'员工自助率'}],
    person:'赵思远',role:'CIO',testimonial:'知识图谱平台将我们内部跨部门的查询响应时间从数天缩短到分钟级，员工自助获取信息的效率提升了12倍。这是华远数字化转型中最成功的项目之一。',
    related:['/cases/case-3.html','/cases/case-4.html']
  }
];

casePages.forEach(cp => {
  write(cp.file, head(cp.org + ' — ' + cp.title) + navbar('cases') + toast + breadcrumb('案例展示', '/cases/', cp.org, cp.file) + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">客户案例</span>
    <h1>${cp.org}</h1>
    <p>${cp.title} — ${cp.quote}</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-dark">
  <div class="container">
    <!-- Background -->
    <div class="mb-12 reveal">
      <span class="section-label">项目背景</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-6">客户挑战</h2>
      <div class="bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10">
        <p class="text-[#c8ccd4] leading-relaxed">${cp.bg}</p>
      </div>
    </div>

    <!-- Solution -->
    <div class="mb-12 reveal">
      <span class="section-label">解决方案</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-6">NovaMind如何助力转型</h2>
      <div class="bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10">
        <p class="text-[#c8ccd4] leading-relaxed">${cp.sol}</p>
      </div>
    </div>

    <!-- Results -->
    <div class="mb-12 reveal">
      <span class="section-label">实施效果</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8">量化业务成果</h2>
      <div class="grid grid-cols-3 gap-4 sm:gap-6">
        ${cp.res.map(r => `<div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-8 text-center reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1"><div class="text-2xl sm:text-3xl font-bold text-nova-cyan mb-2">${r.v}</div><div class="text-sm text-[#6b7280]">${r.l}</div></div>`).join('')}
      </div>
    </div>

    <!-- Testimonial -->
    <div class="mb-12 reveal">
      <span class="section-label">客户评价</span>
      <div class="bg-nova-card border border-white/[0.06] rounded-xl p-8 sm:p-10">
        <p class="text-[#c8ccd4] italic leading-relaxed mb-4">&ldquo;${cp.testimonial}&rdquo;</p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center font-semibold text-sm text-nova-deep">${cp.person[0]}</div>
          <div><span class="block text-sm font-semibold text-[#e8eaed]">${cp.person}</span><span class="block text-xs text-[#6b7280]">${cp.role} · ${cp.org}</span></div>
        </div>
      </div>
    </div>

    <!-- Related -->
    <div class="reveal">
      <span class="section-label">相关案例</span>
      <div class="flex flex-wrap gap-4">
        ${cp.related.map(r => `<a href="${r}" class="btn-outline">查看相关案例 →</a>`).join('')}
      </div>
    </div>
  </div>
</section>
` + cta() + footer());
});

// ── 20. ABOUT ────────────────────────────────────────────────────────

write('company/about.html', head('技术团队') + navbar('about') + toast + breadcrumb('技术团队', '/company/about.html') + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">关于我们</span>
    <h1>技术驱动 · 智赋未来</h1>
    <p>成立于2018年，总部位于上海张江人工智能岛，团队200+AI研究员与工程师，服务500+企业客户。</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-dark">
  <div class="container">
    <!-- Mission -->
    <div class="max-w-[720px] mx-auto text-center mb-16 reveal">
      <p class="text-lg text-[#c8ccd4] leading-relaxed">NovaMind AI 是一家专注于企业级人工智能解决方案的科技公司。我们致力于将前沿AI技术与行业know-how深度融合，帮助企业在复杂商业环境中做出更智能的决策。自成立以来，已累计服务超过500家企业客户，覆盖金融、医疗、制造、零售等多个关键行业。</p>
    </div>

    <!-- Team -->
    <div class="mb-16">
      <span class="section-label">核心团队</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8 text-center">顶尖AI人才汇聚</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${[{n:'张正宇',t:'创始人 & CEO',d:'前阿里巴巴AI Lab首席科学家，斯坦福大学计算机博士，专注深度学习与强化学习15年。'},{n:'林思涵',t:'CTO',d:'前Google Brain研究员，深度学习与多模态模型专家，主导多个千亿参数模型训练。'},{n:'王明哲',t:'CPO',d:'前华为云AI产品负责人，15年企业级产品经验，擅长AI落地与商业化。'},{n:'陈雪莹',t:'COO',d:'前麦肯锡数字转型合伙人，MIT MBA，主导过20+大型企业数字化项目。'}].map((m,i) => `
        <div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-8 text-center reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1" style="transition-delay:${i*0.1}s">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-nova-cyan to-nova-blue flex items-center justify-center font-bold text-xl text-nova-deep mx-auto mb-4">${m.n[0]}</div>
          <h3 class="text-[#e8eaed] font-semibold mb-1">${m.n}</h3>
          <p class="text-nova-cyan text-sm font-medium mb-3">${m.t}</p>
          <p class="text-xs text-[#6b7280] leading-relaxed">${m.d}</p>
        </div>`).join('')}
      </div>
    </div>

    <!-- Stats -->
    <div class="mb-16">
      <span class="section-label">技术实力</span>
      <h2 class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#e8eaed] leading-tight tracking-tight mb-8 text-center">硬核数据</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${[{v:'300+',l:'技术专利'},{v:'200+',l:'团队成员'},{v:'500+',l:'服务企业'},{v:'99.9%',l:'系统可用性'}].map((s,i) => `
        <div class="text-center p-6 sm:p-8 bg-nova-card border border-white/[0.06] rounded-xl reveal transition-all duration-350 hover:border-nova-cyan/30 hover:-translate-y-1" style="transition-delay:${i*0.1}s">
          <div class="text-3xl font-bold bg-gradient-to-r from-nova-cyan to-nova-blue bg-clip-text text-transparent mb-2">${s.v}</div>
          <div class="text-sm text-[#6b7280]">${s.l}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Partners -->
    <div class="reveal">
      <span class="section-label">合作伙伴</span>
      <div class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        ${['🏦 中国银行','🏥 仁和医疗','⚙ 精工智造','🛒 悦享零售','🏗 华远集团','📡 中国电信'].map(p => `<div class="bg-nova-card border border-white/[0.06] rounded-xl p-4 text-center text-sm text-[#6b7280] transition-all duration-350 hover:border-nova-cyan/30 hover:text-nova-cyan">${p}</div>`).join('')}
      </div>
    </div>
  </div>
</section>
` + cta('加入我们，共创AI未来', '/company/contact.html') + footer());

// ── 21. CONTACT ─────────────────────────────────────────────────────

write('company/contact.html', head('合作咨询') + navbar('about') + toast + breadcrumb('合作咨询', '/company/contact.html') + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">合作咨询</span>
    <h1>开启企业智能升级之旅</h1>
    <p>填写表单，我们的解决方案专家将在24小时内与您联系，为您定制专属AI落地策略。</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-dark">
  <div class="container">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-16">
      <!-- Info -->
      <div class="reveal">
        <div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-8 mb-6">
          <span class="text-xs font-semibold tracking-widest uppercase text-nova-cyan">联系方式</span>
          <div class="flex flex-col gap-5 mt-6">
            <div class="flex items-center gap-4"><div class="w-10 h-10 rounded-md bg-nova-cyan/10 flex items-center justify-center text-nova-cyan shrink-0">@</div><div class="flex-1 min-w-0"><span class="block text-sm font-medium text-[#e8eaed]">业务合作邮箱</span><div class="flex items-center gap-2"><a href="mailto:wujiashuaiwu492@gmail.com" class="text-nova-cyan hover:underline text-sm truncate">wujiashuaiwu492@gmail.com</a><button data-copy="wujiashuaiwu492@gmail.com" class="copy-btn w-6 h-6 rounded bg-white/[0.04] hover:bg-nova-cyan/20 flex items-center justify-center text-xs text-[#6b7280] hover:text-nova-cyan transition-all shrink-0">📋</button></div></div></div>
            <div class="flex items-center gap-4"><div class="w-10 h-10 rounded-md bg-nova-cyan/10 flex items-center justify-center text-nova-cyan shrink-0">◉</div><div class="flex-1 min-w-0"><span class="block text-sm font-medium text-[#e8eaed]">咨询热线</span><div class="flex items-center gap-2"><span class="text-sm">400-8820-NOVA</span><button data-copy="400-8820-NOVA" class="copy-btn w-6 h-6 rounded bg-white/[0.04] hover:bg-nova-cyan/20 flex items-center justify-center text-xs text-[#6b7280] hover:text-nova-cyan transition-all shrink-0">📋</button></div></div></div>
            <div class="flex items-center gap-4"><div class="w-10 h-10 rounded-md bg-nova-cyan/10 flex items-center justify-center text-nova-cyan shrink-0">⌂</div><div><span class="block text-sm font-medium text-[#e8eaed]">公司地址</span><span class="text-sm">上海市浦东新区张江人工智能岛</span></div></div>
          </div>
        </div>
        <div class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-8">
          <span class="text-xs font-semibold tracking-widest uppercase text-nova-cyan">办公时间</span>
          <p class="text-sm text-[#9ca3af] mt-3">周一至周五 9:00 - 18:00<br>周末及节假日休息</p>
        </div>
      </div>

      <!-- Form -->
      <form id="contactForm" class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-10 flex flex-col gap-5 reveal reveal-delay-2">
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">姓名 <span class="text-red-400">*</span></label><input type="text" name="name" placeholder="请输入姓名" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">职位</label><input type="text" name="title" placeholder="请输入职位" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">企业邮箱 <span class="text-red-400">*</span></label><input type="email" name="email" placeholder="you@company.com" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
          <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">公司名称</label><input type="text" name="company" placeholder="请输入公司名称" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        </div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">联系电话</label><input type="tel" name="phone" placeholder="请输入联系电话" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">感兴趣的方向</label><select name="interest" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]"><option value="">请选择</option><option>大模型私有化部署</option><option>智能风控解决方案</option><option>医疗影像AI诊断</option><option>工业视觉质检</option><option>供应链智能优化</option><option>其他</option></select></div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">需求描述</label><textarea name="message" placeholder="请简要描述您的业务场景与需求……" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)] resize-vertical min-h-[100px]"></textarea></div>
        <div class="flex gap-3">
          <button type="submit" id="contactBtn" class="flex-1 inline-flex items-center justify-center gap-2 bg-nova-cyan text-nova-deep font-semibold px-8 py-3 rounded-md text-[0.95rem] transition-all duration-350 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.15)]"><span id="contactBtnText">提交咨询 →</span><span id="contactBtnSpinner" class="hidden w-4 h-4 border-2 border-nova-deep border-t-transparent rounded-full animate-spin"></span></button>
          <button type="reset" class="px-6 py-3 text-sm font-medium text-[#9ca3af] bg-transparent border border-white/[0.08] rounded-md transition-all duration-350 hover:bg-white/[0.03] hover:text-[#e8eaed]">重置</button>
        </div>
      </form>
    </div>
  </div>
</section>
` + footer());

// ── 22. BOOKING ─────────────────────────────────────────────────────

write('company/booking.html', head('预约演示') + navbar('about') + toast + breadcrumb('预约演示', '/company/booking.html') + `
<section class="page-hero">
  <div class="container">
    <span class="section-label">预约演示</span>
    <h1>预约产品演示</h1>
    <p>填写表单，我们的解决方案专家将在24小时内与您联系，为您安排专属演示。</p>
  </div>
</section>

<section class="py-16 sm:py-20 bg-nova-dark">
  <div class="max-w-[680px] mx-auto px-4 sm:px-8">
    <form id="bookingForm" class="bg-nova-card border border-white/[0.06] rounded-xl p-6 sm:p-10 flex flex-col gap-5 reveal">
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">姓名 <span class="text-red-400">*</span></label><input type="text" name="name" placeholder="请输入姓名" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">企业名称 <span class="text-red-400">*</span></label><input type="text" name="company" placeholder="请输入企业名称" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
      </div>
      <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">联系邮箱 <span class="text-red-400">*</span></label><input type="email" name="email" placeholder="you@company.com" required class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
      <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">手机号码</label><input type="tel" name="phone" placeholder="请输入手机号码" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
      <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">所属行业</label><select name="industry" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]"><option value="">请选择</option><option>金融</option><option>医疗</option><option>制造</option><option>零售</option><option>能源</option><option>其他</option></select></div>
      <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">感兴趣的产品（可多选）</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          ${['多源数据融合引擎','大模型推理平台','行业知识图谱','智能决策中枢','业务流程自动化','AI运维监控台'].map(p => `<label class="flex items-center gap-2 bg-nova-dark border border-white/[0.06] rounded-md px-3 py-2 cursor-pointer transition-all duration-350 hover:border-nova-cyan/30"><input type="checkbox" name="products" value="${p}" class="accent-nova-cyan" /><span class="text-xs text-[#9ca3af]">${p}</span></label>`).join('')}
        </div>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">预约日期</label><input type="date" name="date" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]" /></div>
        <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">预约时段</label><select name="time" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)]"><option value="">请选择</option><option>09:00-10:00</option><option>10:00-11:00</option><option>11:00-12:00</option><option>14:00-15:00</option><option>15:00-16:00</option><option>16:00-17:00</option></select></div>
      </div>
      <div class="form-group"><label class="text-sm font-medium text-[#9ca3af]">其他需求</label><textarea name="message" placeholder="请描述您感兴趣的场景或特殊需求……" class="bg-nova-dark border border-white/[0.06] rounded-md px-4 py-3 text-sm text-[#e8eaed] outline-none transition-all duration-350 placeholder:text-[#6b7280] focus:border-nova-cyan focus:shadow-[0_0_0_3px_rgba(0,212,170,0.15)] resize-vertical min-h-[80px]"></textarea></div>
      <button type="submit" id="bookingBtn" class="w-full inline-flex items-center justify-center gap-2 bg-nova-cyan text-nova-deep font-semibold px-8 py-3 rounded-md text-[0.95rem] transition-all duration-350 hover:bg-[#00e8bc] hover:shadow-[0_0_32px_rgba(0,212,170,0.15)]"><span id="bookingBtnText">提交预约 →</span><span id="bookingBtnSpinner" class="hidden w-4 h-4 border-2 border-nova-deep border-t-transparent rounded-full animate-spin"></span></button>
    </form>

    <!-- Direct contact -->
    <div class="mt-12 text-center reveal">
      <p class="text-[#6b7280] mb-4">或直接联系我们</p>
      <div class="flex flex-wrap justify-center gap-6">
        <a href="mailto:wujiashuaiwu492@gmail.com" class="text-nova-cyan hover:underline text-sm">wujiashuaiwu492@gmail.com</a>
        <span class="text-[#6b7280] hidden sm:inline">|</span>
        <span class="text-sm text-[#9ca3af]">400-8820-NOVA</span>
      </div>
    </div>
  </div>
</section>
` + footer());

console.log('\n✅ All 22 pages written to ' + BASE);
console.log('   Open index.html to start browsing.\n');
