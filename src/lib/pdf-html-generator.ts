import { ResumeData } from '@/types/resume';
import { sanitizeSkillsForRender } from '@/lib/templates';

export function generateResumeHtml(rawData: ResumeData): string {
  const data = sanitizeSkillsForRender(rawData);
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor,
    templateId,
    fontFamily,
    spacing = 'normal',
  } = data;

  const getPdfFontFamilyCss = () => {
    switch (fontFamily) {
      case 'roboto':
        return "font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;";
      case 'sourcesans':
        return "font-family: 'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;";
      case 'poppins':
        return "font-family: 'Poppins', sans-serif;";
      case 'montserrat':
        return "font-family: 'Montserrat', sans-serif;";
      case 'lato':
        return "font-family: 'Lato', sans-serif;";
      case 'raleway':
        return "font-family: 'Raleway', sans-serif;";
      case 'rubik':
        return "font-family: 'Rubik', sans-serif;";
      case 'opensans':
        return "font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;";
      case 'times':
        return "font-family: 'Times New Roman', Times, 'EB Garamond', Georgia, serif;";
      case 'garamond':
        return "font-family: 'Times New Roman', Times, 'EB Garamond', Georgia, serif;";
      case 'playfair':
        return "font-family: 'Playfair Display', Georgia, Cambria, serif;";
      case 'merriweather':
        return "font-family: 'Merriweather', Georgia, Cambria, serif;";
      case 'outfit':
        return "font-family: 'Outfit', sans-serif;";
      case 'jakarta':
        return "font-family: 'Plus Jakarta Sans', sans-serif;";
      case 'inter':
      default:
        return "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;";
    }
  };

  const fontStyle = getPdfFontFamilyCss();

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-12' : 'p-9';
  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-4' : spacing === 'relaxed' ? 'space-y-7' : 'space-y-6';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-3' : spacing === 'relaxed' ? 'space-y-5' : 'space-y-4';

  const escapeHtml = (str?: string) =>
    (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  // Template 1: Prawira (Modern two-tone)
  const renderPrawira = () => `
    <div style="background-color: ${themeColor || '#2563eb'};" class="w-full text-white p-9 flex items-center justify-between gap-6 break-inside-avoid">
      <div class="flex-1">
        <h1 class="text-4xl font-black tracking-tight uppercase text-white mb-1.5 leading-tight">
          ${escapeHtml(personalInfo.fullName || 'Muhammad Prawira')}
        </h1>
        <p class="text-lg font-bold text-blue-100 tracking-wide uppercase mb-2">
          ${escapeHtml(personalInfo.jobTitle || 'Investment Banking Analyst')}
        </p>
        <p class="text-[13px] text-blue-50 line-clamp-3 max-w-2xl opacity-95 leading-relaxed font-normal">
          ${escapeHtml(personalInfo.summary)}
        </p>
      </div>
      ${
        personalInfo.avatarUrl
          ? `<div class="shrink-0"><img src="${escapeHtml(personalInfo.avatarUrl)}" class="w-24 h-28 object-cover rounded-md border-2 border-white/90 shadow-md" /></div>`
          : ''
      }
    </div>

    <div class="bg-slate-100 px-9 py-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[12.5px] text-slate-700 font-medium border-b border-slate-200">
      ${personalInfo.email ? `<div>✉ ${escapeHtml(personalInfo.email)}</div>` : ''}
      ${personalInfo.phone ? `<div>☎ ${escapeHtml(personalInfo.phone)}</div>` : ''}
      ${personalInfo.location ? `<div>📍 ${escapeHtml(personalInfo.location)}</div>` : ''}
      ${personalInfo.website ? `<div>🌐 ${escapeHtml(personalInfo.website.replace(/^https?:\/\//, ''))}</div>` : ''}
      ${personalInfo.linkedin ? `<div>in ${escapeHtml(personalInfo.linkedin.replace(/^https?:\/\//, ''))}</div>` : ''}
    </div>

    <div class="${paddingClass} grid grid-cols-12 gap-8 text-[13.5px]">
      <div class="col-span-7 ${sectionSpaceClass}">
        <div>
          <h2 style="border-color: ${themeColor || '#2563eb'}; color: ${themeColor || '#2563eb'};" class="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid">
            Work Experience
          </h2>
          <div class="${itemSpaceClass}">
            ${experience
              .map(
                (exp) => `
              <div class="relative pl-3.5 border-l-2 border-slate-200 break-inside-avoid">
                <div class="flex justify-between items-baseline mb-0.5">
                  <span class="font-bold text-slate-900 text-[14.5px]">${escapeHtml(exp.role)}</span>
                  <span class="text-[12px] font-medium text-slate-500">${escapeHtml(exp.startDate)} - ${exp.current ? 'Present' : escapeHtml(exp.endDate)}</span>
                </div>
                <div class="text-[13px] font-semibold text-slate-700 mb-2">
                  ${escapeHtml(exp.company)} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}
                </div>
                <ul class="list-disc pl-4 space-y-1.5 text-[13px] text-slate-700 leading-normal">
                  ${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        ${
          projects && projects.length > 0
            ? `
          <div>
            <h2 style="border-color: ${themeColor || '#2563eb'}; color: ${themeColor || '#2563eb'};" class="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid">
              Featured Projects
            </h2>
            <div class="${itemSpaceClass}">
              ${projects
                .map(
                  (p) => `
                <div class="bg-slate-50/80 p-3 rounded border border-slate-200/70 break-inside-avoid">
                  <div class="flex justify-between items-baseline mb-1">
                    <span class="font-bold text-slate-900 text-[13.5px]">${escapeHtml(p.title)}</span>
                    ${p.link ? `<span class="text-[11.5px] text-blue-600">${escapeHtml(p.link)}</span>` : ''}
                  </div>
                  <ul class="list-disc pl-4 space-y-1 text-[13px] text-slate-700 leading-normal">
                    ${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
                  </ul>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>

      <div class="col-span-5 ${sectionSpaceClass}">
        <div>
          <h2 style="border-color: ${themeColor || '#2563eb'}; color: ${themeColor || '#2563eb'};" class="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid">
            Education
          </h2>
          <div class="${itemSpaceClass}">
            ${education
              .map(
                (edu) => `
              <div class="text-[13px] break-inside-avoid">
                <div class="font-bold text-slate-900 text-[14px]">${escapeHtml(edu.degree)}</div>
                <div class="text-slate-700 font-medium">${escapeHtml(edu.school)}</div>
                <div class="text-slate-500 text-[12px] flex justify-between mt-0.5">
                  <span>${escapeHtml(edu.location)}</span>
                  <span>${escapeHtml(edu.graduationDate)}</span>
                </div>
                ${edu.gpa ? `<div class="text-[12px] text-slate-600 mt-0.5 font-medium">GPA: ${escapeHtml(edu.gpa)}</div>` : ''}
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div>
          <h2 style="border-color: ${themeColor || '#2563eb'}; color: ${themeColor || '#2563eb'};" class="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2">
            Skills & Competencies
          </h2>
          <div class="space-y-3">
            ${skills
              .map(
                (cat) => `
              <div>
                <div class="text-[12.5px] font-bold text-slate-800 mb-1.5">${escapeHtml(cat.category)}</div>
                <div class="flex flex-wrap gap-1.5">
                  ${cat.items
                    .map(
                      (it) => `
                    <span class="bg-slate-100 text-slate-800 text-[12px] px-2.5 py-1 rounded font-medium border border-slate-200/60">
                      ${escapeHtml(it)}
                    </span>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        ${
          certifications && certifications.length > 0
            ? `
          <div>
            <h2 style="border-color: ${themeColor || '#2563eb'}; color: ${themeColor || '#2563eb'};" class="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2">
              Certifications
            </h2>
            <div class="space-y-2.5">
              ${certifications
                .map(
                  (c) => `
                <div class="text-[13px]">
                  <div class="font-bold text-slate-800">${escapeHtml(c.name)}</div>
                  <div class="text-[12px] text-slate-500">${escapeHtml(c.issuer)} (${escapeHtml(c.date)})</div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;

  // Template 3: Chastain (Modern Clean)
  const renderChastain = () => `
    <div class="text-slate-800 text-[13.5px] leading-relaxed">
      <div class="bg-slate-100 border-b border-slate-200 py-7 px-8 flex flex-col items-center text-center break-inside-avoid">
        ${
          personalInfo.avatarUrl
            ? `<img src="${escapeHtml(personalInfo.avatarUrl)}" class="w-22 h-22 rounded-full object-cover border-4 border-white shadow-md mb-3" />`
            : `<div style="background-color: ${themeColor || '#475569'};" class="w-18 h-18 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md mb-3">${escapeHtml(personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'J')}</div>`
        }
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 uppercase mb-1">${escapeHtml(personalInfo.fullName || 'Jane Chastain')}</h1>
        <p class="text-sm font-bold tracking-widest text-slate-600 uppercase mb-3.5">${escapeHtml(personalInfo.jobTitle || 'Head of People & Operations')}</p>
        <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[12.5px] text-slate-600 font-medium">
          ${personalInfo.email ? `<span>${escapeHtml(personalInfo.email)}</span>` : ''}
          ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
          ${personalInfo.location ? `<span>${escapeHtml(personalInfo.location)}</span>` : ''}
        </div>
      </div>
      <div class="grid grid-cols-12 gap-8 ${paddingClass}">
        <div class="col-span-4 ${sectionSpaceClass} border-r border-slate-100 pr-6">
          ${personalInfo.summary ? `<div class="break-inside-avoid"><h2 class="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 break-after-avoid">Profile</h2><p class="text-[13px] text-slate-700 leading-relaxed">${escapeHtml(personalInfo.summary)}</p></div>` : ''}
          <div class="break-inside-avoid"><h2 class="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 break-after-avoid">Education</h2><div class="${itemSpaceClass}">${education.map((e) => `<div class="text-[13px] break-inside-avoid"><div class="font-bold text-slate-800 text-[14px]">${escapeHtml(e.degree)}</div><div class="text-slate-700">${escapeHtml(e.school)}</div><div class="text-[12px] text-slate-500">${escapeHtml(e.graduationDate)}</div></div>`).join('')}</div></div>
          <div class="break-inside-avoid"><h2 class="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 break-after-avoid">Skills</h2><div class="${itemSpaceClass}">${skills.map((s) => `<div class="break-inside-avoid"><div class="text-[12px] font-bold text-slate-700 uppercase mb-1">${escapeHtml(s.category)}</div><div class="flex flex-wrap gap-1.5">${s.items.map((it) => `<span class="text-[12px] bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded font-medium">${escapeHtml(it)}</span>`).join('')}</div></div>`).join('')}</div></div>
        </div>
        <div class="col-span-8 ${sectionSpaceClass}">
          <div>
            <h2 style="border-color: ${themeColor || '#475569'}; color: ${themeColor || '#475569'};" class="text-sm font-bold uppercase tracking-wider pb-1.5 mb-4 border-b-2 break-after-avoid">Employment History</h2>
            <div class="${itemSpaceClass}">
              ${experience.map((e) => `<div class="break-inside-avoid"><div class="flex justify-between items-baseline mb-0.5"><span class="font-bold text-slate-900 text-[15px]">${escapeHtml(e.role)}</span><span class="text-[12px] font-bold text-slate-500">${escapeHtml(e.startDate)} – ${e.current ? 'Present' : escapeHtml(e.endDate)}</span></div><div class="text-[13.5px] font-semibold text-slate-700 mb-2">${escapeHtml(e.company)} ${e.location ? `• ${escapeHtml(e.location)}` : ''}</div><ul class="list-disc pl-4 space-y-1.5 text-[13px] text-slate-700 leading-normal">${e.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Template 4: Rahadian (Bold Tech)
  const renderRahadian = () => `
    <div class="${paddingClass} text-neutral-800 text-[13.5px] leading-relaxed">
      <div class="flex items-start justify-between border-b-2 border-neutral-900 pb-6 mb-7 break-inside-avoid">
        <div class="flex items-center gap-3.5">
          <div style="background-color: ${themeColor || '#eab308'};" class="w-11 h-11 rounded flex items-center justify-center font-black text-neutral-950 text-base">LK</div>
          <div>
            <h1 class="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 leading-none">${escapeHtml(personalInfo.fullName || 'Lukito Rahadian')}</h1>
            <p class="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-1.5">${escapeHtml(personalInfo.jobTitle || 'Senior Cloud Architect & DevOps Lead')}</p>
          </div>
        </div>
        <div class="text-right text-[12.5px] text-neutral-600 space-y-1 font-mono font-medium">
          ${personalInfo.email ? `<div>${escapeHtml(personalInfo.email)}</div>` : ''}
          ${personalInfo.phone ? `<div>${escapeHtml(personalInfo.phone)}</div>` : ''}
          ${personalInfo.location ? `<div>${escapeHtml(personalInfo.location)}</div>` : ''}
        </div>
      </div>
      ${personalInfo.summary ? `<div style="border-color: ${themeColor || '#eab308'};" class="bg-neutral-50 border-l-4 p-4 mb-7 text-[13px] text-neutral-700 rounded-r break-inside-avoid"><p class="leading-relaxed">${escapeHtml(personalInfo.summary)}</p></div>` : ''}
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-8 ${sectionSpaceClass}">
          <div>
            <h2 class="text-sm font-black uppercase tracking-wider text-neutral-900 mb-3.5 flex items-center gap-2 break-after-avoid">
              <span style="background-color: ${themeColor || '#eab308'};" class="w-3 h-3 rounded-xs inline-block"></span>
              Work Experience
            </h2>
            <div class="${itemSpaceClass}">
              ${experience.map((e) => `<div class="pl-3.5 border-l-2 border-neutral-300 break-inside-avoid"><div class="flex justify-between items-baseline mb-0.5"><span class="font-bold text-neutral-900 text-[15px]">${escapeHtml(e.role)}</span><span class="text-[12px] font-mono text-neutral-500">${escapeHtml(e.startDate)} – ${e.current ? 'Present' : escapeHtml(e.endDate)}</span></div><div class="text-[13px] font-bold text-neutral-700 mb-2">${escapeHtml(e.company)} // ${escapeHtml(e.location)}</div><ul class="list-disc pl-4 space-y-1.5 text-[13px] text-neutral-700 leading-normal">${e.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul></div>`).join('')}
            </div>
          </div>
        </div>
        <div class="col-span-4 ${sectionSpaceClass}">
          <div class="break-inside-avoid">
            <h2 class="text-sm font-black uppercase tracking-wider text-neutral-900 mb-3.5 flex items-center gap-2 break-after-avoid"><span style="background-color: ${themeColor || '#eab308'};" class="w-3 h-3 rounded-xs inline-block"></span>Technical Stack</h2>
            <div class="${itemSpaceClass}">${skills.map((s) => `<div class="break-inside-avoid"><div class="text-[11.5px] font-bold uppercase text-neutral-500 mb-1">${escapeHtml(s.category)}</div><div class="flex flex-wrap gap-1.5">${s.items.map((it) => `<span class="bg-neutral-100 text-neutral-800 text-[12px] font-mono px-2 py-0.5 rounded border border-neutral-200">${escapeHtml(it)}</span>`).join('')}</div></div>`).join('')}</div>
          </div>
          <div class="break-inside-avoid">
            <h2 class="text-sm font-black uppercase tracking-wider text-neutral-900 mb-3.5 flex items-center gap-2 break-after-avoid"><span style="background-color: ${themeColor || '#eab308'};" class="w-3 h-3 rounded-xs inline-block"></span>Education</h2>
            <div class="${itemSpaceClass}">${education.map((e) => `<div class="text-[13px] break-inside-avoid"><div class="font-bold text-neutral-900 text-[14px]">${escapeHtml(e.degree)}</div><div class="text-neutral-700">${escapeHtml(e.school)}</div><div class="text-[12px] font-mono text-neutral-500 mt-0.5">${escapeHtml(e.graduationDate)} // ${escapeHtml(e.location)}</div></div>`).join('')}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Template 5: Santoso (Geometric Arc)
  const renderSantoso = () => `
    <div class="${paddingClass} relative overflow-hidden text-slate-800 text-[13.5px] leading-relaxed">
      <div style="background-color: ${themeColor || '#f59e0b'};" class="absolute top-28 -left-20 w-88 h-88 rounded-full opacity-90 -z-0"></div>
      <div class="relative z-10">
        <div class="grid grid-cols-12 gap-8 mb-8 pb-6 border-b border-slate-200 break-inside-avoid">
          <div class="col-span-5">
            <h1 class="text-3xl sm:text-4xl font-black uppercase text-slate-900 leading-none mb-1.5">${escapeHtml(personalInfo.fullName || 'Rudian Santoso')}</h1>
            <p class="text-sm font-bold text-slate-600 uppercase tracking-widest">${escapeHtml(personalInfo.jobTitle || 'Creative Director & Brand Strategist')}</p>
          </div>
          <div class="col-span-7 text-right text-[12.5px] text-slate-600 space-y-1">
            <div>${escapeHtml(personalInfo.email)} • ${escapeHtml(personalInfo.phone)}</div>
            <div>${escapeHtml(personalInfo.location)}</div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-10">
          <div class="col-span-4 ${sectionSpaceClass}">
            ${personalInfo.summary ? `<div class="bg-white/95 p-4 rounded-xl shadow-xs border border-slate-100 break-inside-avoid"><h2 class="text-sm font-black uppercase text-slate-900 mb-2 break-after-avoid">Profile</h2><p class="text-[13px] text-slate-700 leading-relaxed">${escapeHtml(personalInfo.summary)}</p></div>` : ''}
            <div class="bg-white/95 p-4 rounded-xl shadow-xs border border-slate-100 break-inside-avoid"><h2 class="text-sm font-black uppercase text-slate-900 mb-2.5 break-after-avoid">Education</h2><div class="${itemSpaceClass}">${education.map((e) => `<div class="text-[13px] break-inside-avoid"><div class="font-bold text-slate-900 text-[14px]">${escapeHtml(e.degree)}</div><div class="text-slate-700">${escapeHtml(e.school)}</div></div>`).join('')}</div></div>
            <div class="bg-white/95 p-4 rounded-xl shadow-xs border border-slate-100 break-inside-avoid"><h2 class="text-sm font-black uppercase text-slate-900 mb-2.5 break-after-avoid">Skills</h2><div class="${itemSpaceClass}">${skills.map((s) => `<div class="break-inside-avoid"><div class="text-[11.5px] font-bold uppercase text-slate-500 mb-1">${escapeHtml(s.category)}</div><div class="flex flex-wrap gap-1.5">${s.items.map((it) => `<span class="bg-slate-100 text-slate-800 text-[12px] px-2.5 py-0.5 rounded font-medium">${escapeHtml(it)}</span>`).join('')}</div></div>`).join('')}</div></div>
          </div>
          <div class="col-span-8 ${sectionSpaceClass}">
            <div>
              <h2 class="text-sm font-black uppercase tracking-wider text-slate-900 pb-1.5 mb-4 border-b-2 border-slate-900 break-after-avoid">Experience</h2>
              <div class="${itemSpaceClass}">
                ${experience.map((e) => `<div class="break-inside-avoid"><div class="flex justify-between items-baseline mb-0.5"><span class="font-bold text-slate-900 text-[15px]">${escapeHtml(e.role)}</span><span class="text-[12px] font-medium text-slate-500">${escapeHtml(e.startDate)} – ${e.current ? 'Present' : escapeHtml(e.endDate)}</span></div><div class="text-[13.5px] font-bold text-amber-800 mb-2">${escapeHtml(e.company)} • ${escapeHtml(e.location)}</div><ul class="list-disc pl-4 space-y-1.5 text-[13px] text-slate-700 leading-normal">${e.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Template 6: ATS Clean Standard
  const renderATS = () => `
    <div class="${paddingClass} text-black text-[13.5px] leading-normal">
      <div class="text-center pb-5 border-b border-black break-inside-avoid">
        <h1 class="text-3xl font-bold uppercase mb-1 tracking-tight">${escapeHtml(personalInfo.fullName || 'Candidate')}</h1>
        <div style="color: ${themeColor || '#0284c7'};" class="text-base font-bold mb-2">${escapeHtml(personalInfo.jobTitle)}</div>
        <div class="text-[13px] text-neutral-800 font-medium">${escapeHtml(personalInfo.location)} • ${escapeHtml(personalInfo.phone)} • ${escapeHtml(personalInfo.email)}</div>
      </div>
      ${personalInfo.summary ? `<div class="mt-5 break-inside-avoid"><h2 class="text-sm font-bold uppercase border-b border-black pb-1 mb-2 break-after-avoid">Summary</h2><p class="text-[13px] text-neutral-800 text-justify leading-relaxed">${escapeHtml(personalInfo.summary)}</p></div>` : ''}
      <div class="mt-5"><h2 class="text-sm font-bold uppercase border-b border-black pb-1 mb-2.5 break-after-avoid">Work Experience</h2><div class="${itemSpaceClass}">${experience.map((e) => `<div class="break-inside-avoid"><div class="flex justify-between font-bold text-[14.5px]"><span>${escapeHtml(e.role)}</span><span class="text-[12.5px] font-semibold">${escapeHtml(e.startDate)} – ${e.current ? 'Present' : escapeHtml(e.endDate)}</span></div><div class="italic text-[13px] text-neutral-800 mb-1.5 font-medium">${escapeHtml(e.company)} (${escapeHtml(e.location)})</div><ul class="list-disc pl-4 space-y-1 text-[13px] text-neutral-800 leading-normal">${e.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul></div>`).join('')}</div></div>
      <div class="mt-5"><h2 class="text-sm font-bold uppercase border-b border-black pb-1 mb-2.5 break-after-avoid">Education</h2><div class="${itemSpaceClass}">${education.map((e) => `<div class="break-inside-avoid"><div class="flex justify-between font-bold text-[14px]"><span>${escapeHtml(e.degree)}</span><span class="text-[12.5px] font-semibold">${escapeHtml(e.graduationDate)}</span></div><div class="italic text-[13px] text-neutral-800">${escapeHtml(e.school)} - ${escapeHtml(e.location)}</div></div>`).join('')}</div></div>
      <div class="mt-5 break-inside-avoid"><h2 class="text-sm font-bold uppercase border-b border-black pb-1 mb-2.5 break-after-avoid">Skills</h2><div class="space-y-1.5 text-[13px]"><div><span class="font-bold">${escapeHtml(skills.map(s => s.category).join(', '))}: </span><span>${escapeHtml(skills.flatMap(s => s.items).join(', '))}</span></div></div></div>
    </div>
  `;

  let innerHtml = '';
  switch (templateId) {
    case 'chastain':
      innerHtml = renderChastain();
      break;
    case 'rahadian':
      innerHtml = renderRahadian();
      break;
    case 'santoso':
      innerHtml = renderSantoso();
      break;
    case 'ats':
      innerHtml = renderATS();
      break;
    case 'prawira':
    default:
      innerHtml = renderPrawira();
      break;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(data.title || 'Resume')}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Montserrat:wght@300;400;500;600;700;800&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Rubik:wght@300;400;500;600;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            ${fontStyle}
          }
          .break-inside-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .break-after-avoid {
            break-after: avoid !important;
            page-break-after: avoid !important;
          }
        </style>
      </head>
      <body>
        <div style="width: 210mm; min-height: 297mm; margin: 0 auto; background-color: #ffffff;">
          ${innerHtml}
        </div>
      </body>
    </html>
  `;
}
