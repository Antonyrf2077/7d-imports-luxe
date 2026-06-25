import React from 'react';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* VÍDEO DE FUNDO - A camada mais profunda (-z-20) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
        src="https://res.cloudinary.com/djr5ccokh/video/upload/v1782391709/Flow_1080p_202606250941_1_j0wtb9.mp4"
      />

      {/* OVERLAY LEVE PARA CONTRASTE (-z-10) */}
      <div className="absolute inset-0 bg-white/20 -z-10"></div>

      {/* CONTEÚDO (Mantendo suas animações e estrutura) */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-12 lg:px-24">
        {/* Aqui coloque o seu conteúdo de texto, títulos e botões */}
        <h3 className="text-[#CEAA71] font-serif text-xl tracking-widest mb-4">
          DESIGN PURISTA
        </h3>
        <h1 className="font-serif text-7xl font-normal text-[#021a10] mb-6">
          PEÇAS<br />EXCLUSIVAS
        </h1>
        <button className="bg-[#CEAA71] text-[#021a10] px-10 py-4 uppercase tracking-widest font-semibold hover:opacity-90 transition">
          Quero minha peça exclusiva
        </button>
      </div>
    </section>
  );
};

export default Hero;

