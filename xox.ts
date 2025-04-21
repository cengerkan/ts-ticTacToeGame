import React, { useState } from "react";

type Oyuncu = "X" | "O" | null;

const XoxOyunu: React.FC = () => {
  const [tahta, tahtaGuncelle] = useState<Oyuncu[]>(Array(9).fill(null));
  const [siradakiOyuncu, siradakiOyuncuyuAyarla] = useState<Oyuncu>("X");
  const [kazanan, kazananAyarla] = useState<Oyuncu>(null);

  const kareyeTikla = (indeks: number) => {
    if (tahta[indeks] || kazanan) return;

    const yeniTahta = [...tahta];
    yeniTahta[indeks] = siradakiOyuncu;
    tahtaGuncelle(yeniTahta);

    const sonuc = kazananKontrolEt(yeniTahta);
    if (sonuc) {
      kazananAyarla(sonuc);
    } else {
      siradakiOyuncuyuAyarla(siradakiOyuncu === "X" ? "O" : "X");
    }
  };

  const kazananKontrolEt = (kareler: Oyuncu[]): Oyuncu => {
    const kombinasyonlar = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of kombinasyonlar) {
      if (kareler[a] && kareler[a] === kareler[b] && kareler[a] === kareler[c]) {
        return kareler[a];
      }
    }

    return null;
  };

  const oyunuSifirla = () => {
    tahtaGuncelle(Array(9).fill(null));
    siradakiOyuncuyuAyarla("X");
    kazananAyarla(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">XOX Oyunu</h1>
      <div className="grid grid-cols-3 gap-2">
        {tahta.map((deger, indeks) => (
          <button
            key={indeks}
            className="w-20 h-20 text-3xl font-bold border rounded shadow-md hover:bg-gray-100"
            onClick={() => kareyeTikla(indeks)}
          >
            {deger}
          </button>
        ))}
      </div>
      {kazanan && (
        <div className="mt-4 text-xl font-semibold text-green-600">
          Kazanan: {kazanan}
        </div>
      )}
      {!kazanan && tahta.every(Boolean) && (
        <div className="mt-4 text-xl font-semibold text-yellow-600">
          Berabere!
        </div>
      )}
      <button
        onClick={oyunuSifirla}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Oyunu Sıfırla
      </button>
    </div>
  );
};

export default XoxOyunu;
