'use client';

import React from 'react';

// Preview for Prawira Modern (Dual Column Tech Model)
export const PrawiraCardPreview: React.FC = () => (
  <div className="w-full h-full bg-white flex text-[7.5px] leading-tight select-none overflow-hidden font-sans border border-slate-200/60 rounded shadow-xs">
    {/* Left Column with Photo & Blue Contact Block */}
    <div className="w-[38%] bg-white flex flex-col border-r border-slate-100 shrink-0">
      <div className="w-full h-[54%] overflow-hidden bg-slate-100">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
          alt="Aditya Verma"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex-1 bg-[#1d4ed8] text-white p-2 flex flex-col justify-start">
        <div className="font-bold text-[8px] uppercase tracking-wider mb-1 text-white border-b border-blue-400/40 pb-0.5">
          Contact Info
        </div>
        <div className="space-y-0.5 text-[6.5px] text-blue-100 font-normal leading-tight opacity-90">
          <div>Bengaluru, India</div>
          <div>+91 98765 43210</div>
          <div>aditya.v@example.com</div>
          <div>linkedin.com/in/aditya-v</div>
          <div>github.com/aditya-dev</div>
        </div>
      </div>
    </div>

    {/* Right Column with Content */}
    <div className="w-[62%] p-2.5 flex flex-col justify-start space-y-1.5 overflow-hidden">
      <div>
        <div className="font-black text-[#1d4ed8] text-[12px] leading-none uppercase tracking-tight">
          Aditya
        </div>
        <div className="font-black text-[#1d4ed8] text-[12px] leading-none uppercase tracking-tight">
          Verma
        </div>
        <div className="text-[6.5px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 pb-1 border-b border-slate-200">
          SENIOR FULL STACK ENGINEER
        </div>
      </div>

      <div>
        <div className="font-bold text-[#1d4ed8] text-[7.5px] mb-0.5">Executive Summary</div>
        <p className="text-[6px] text-slate-500 line-clamp-2 leading-tight">
          Full stack engineer with 4+ years architecting scalable microservices, UPI payment pipelines, and high-performance React frontends.
        </p>
      </div>

      <div>
        <div className="font-bold text-[#1d4ed8] text-[7.5px] mb-0.5">Core Competencies</div>
        <div className="space-y-0.5 text-[6px] text-slate-600 pl-1.5">
          <div>• React, Next.js, TypeScript</div>
          <div>• Node.js, Express, Microservices</div>
          <div>• PostgreSQL, Redis, Kafka</div>
          <div>• AWS, Docker, Kubernetes</div>
        </div>
      </div>

      <div>
        <div className="font-bold text-[#1d4ed8] text-[7.5px] mb-0.5">Work Experience</div>
        <div className="text-[6.5px] font-bold text-slate-800">SDE-2 &middot; CloudScale Tech</div>
        <div className="text-[5.5px] text-slate-400 mb-0.5">Bengaluru &middot; 2022 &ndash; Present</div>
        <div className="text-[6px] text-slate-600 space-y-0.5 pl-1.5">
          <div>• Scaled payment API to 4.2M daily transactions</div>
          <div>• Reduced p99 query latency by 45% with Redis</div>
        </div>
      </div>
    </div>
  </div>
);

// Preview for Jamie Chastain (Investment Banking Model)
export const ChastainCardPreview: React.FC = () => (
  <div className="w-full h-full bg-white flex flex-col text-[7.5px] leading-tight select-none overflow-hidden font-sans border border-slate-200/60 rounded shadow-xs">
    {/* Soft Gray Header with Circular Portrait Photo */}
    <div className="bg-[#cbd5e1]/60 py-2 px-2 flex flex-col items-center justify-center border-b border-slate-200">
      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-xs mb-1">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
          alt="Jamie Chastain"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="font-bold text-slate-900 text-[9px] uppercase tracking-wide leading-tight">
        JAMIE CHASTAIN
      </div>
      <div className="text-[5.5px] font-semibold text-slate-500 uppercase tracking-wider">
        SOFTWARE DEVELOPER
      </div>
    </div>

    {/* 2 Column Body */}
    <div className="grid grid-cols-12 gap-2 p-2 flex-1">
      <div className="col-span-5 space-y-1.5 border-r border-slate-100 pr-1.5">
        <div>
          <div className="font-bold text-[7px] uppercase text-slate-800 border-b border-slate-200 pb-0.5 mb-0.5">
            Profile
          </div>
          <p className="text-[5.5px] text-slate-500 leading-tight">
            I am a software developer with proven problem solving and engineering experience in high-throughput applications.
          </p>
        </div>

        <div>
          <div className="font-bold text-[7px] uppercase text-slate-800 border-b border-slate-200 pb-0.5 mb-0.5">
            Skills
          </div>
          <div className="text-[5.5px] text-slate-600 space-y-0.5">
            <div>• JavaScript / TypeScript</div>
            <div>• React / Next.js</div>
            <div>• Node.js / PostgreSQL</div>
          </div>
        </div>

        <div>
          <div className="font-bold text-[7px] uppercase text-slate-800 border-b border-slate-200 pb-0.5 mb-0.5">
            References
          </div>
          <div className="text-[5.5px] text-slate-500">Available upon request</div>
        </div>
      </div>

      <div className="col-span-7 space-y-1.5">
        <div>
          <div className="font-bold text-[7px] uppercase text-slate-800 border-b border-slate-200 pb-0.5 mb-0.5">
            Career Summary
          </div>
          <div className="space-y-1 text-[6px]">
            <div>
              <div className="font-bold text-slate-800">Software Engineer</div>
              <div className="text-[5px] text-slate-400">TechCorp • 2021 - Present</div>
              <div className="text-slate-600 leading-tight">• Engineered custom scalable microservices</div>
            </div>
            <div>
              <div className="font-bold text-slate-800">Frontend Developer</div>
              <div className="text-[5px] text-slate-400">Apex Media • 2019 - 2021</div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold text-[7px] uppercase text-slate-800 border-b border-slate-200 pb-0.5 mb-0.5">
            Education
          </div>
          <div className="text-[5.5px] text-slate-600">
            <div className="font-semibold text-slate-800">B.S. in Computer Science</div>
            <div className="text-[5px] text-slate-400">Stanford University • 2019</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Preview for Lukito Rahadian (Investment Banking Model with Lock)
export const RahadianCardPreview: React.FC = () => (
  <div className="w-full h-full bg-white flex flex-col p-2.5 text-[7.5px] leading-tight select-none overflow-hidden font-sans border border-slate-200/60 rounded shadow-xs">
    {/* Header with Yellow LR Badge */}
    <div className="flex items-center gap-1.5 pb-1.5 border-b-2 border-slate-900 mb-1.5">
      <div className="w-5 h-5 rounded bg-[#facc15] text-slate-950 font-black text-[9px] flex items-center justify-center shrink-0">
        LR
      </div>
      <div>
        <div className="font-black text-slate-950 text-[12px] uppercase leading-none tracking-tight">
          LUKITO RAHADIAN
        </div>
      </div>
    </div>

    {/* 2 Column Body */}
    <div className="grid grid-cols-12 gap-2 flex-1">
      {/* Left Col */}
      <div className="col-span-4 space-y-1.5">
        <div>
          <div className="font-bold text-[7px] uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-0.5">
            Kontak
          </div>
          <div className="text-[5.5px] text-slate-500 space-y-0.5">
            <div>lukito@email.com</div>
            <div>0812-3456-7890</div>
            <div>Jakarta, Indonesia</div>
          </div>
        </div>

        <div>
          <div className="font-bold text-[7px] uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-0.5">
            Pendidikan
          </div>
          <div className="text-[5.5px] text-slate-600">
            <div className="font-bold text-slate-800">Universitas Indonesia</div>
            <div className="text-[5px] text-slate-400">Teknik Industri • 2018</div>
          </div>
        </div>
      </div>

      {/* Right Col */}
      <div className="col-span-8 space-y-1.5">
        <div>
          <div className="font-bold text-[7px] uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-0.5">
            Tujuan
          </div>
          <p className="text-[5.5px] text-slate-600 leading-tight">
            Memiliki dedikasi tinggi dan kemampuan analisis tajam untuk memberikan kontribusi nyata bagi pertumbuhan perusahaan.
          </p>
        </div>

        <div>
          <div className="font-bold text-[7px] uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-0.5">
            Pengalaman Kerja
          </div>
          <div className="space-y-1 text-[6px]">
            <div>
              <div className="font-bold text-slate-900">Aparatur Sipil Negara / Analis Operasional</div>
              <div className="text-[5px] text-slate-400">Kementerian Keuangan • 2019 - Sekarang</div>
              <div className="text-slate-600 leading-tight">• Mengoptimalkan alur operasional perizinan logistik</div>
            </div>
            <div>
              <div className="font-bold text-slate-900">Project Specialist</div>
              <div className="text-[5px] text-slate-400">Global Logistics • 2018 - 2019</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
