const PEKANBARU_TIME_ZONE = "Asia/Jakarta";
const PEKANBARU_UTC_OFFSET = "+07:00";
const EQURAN_SHALAT_URL = "https://equran.id/api/v2/shalat";

type EquranSchedule = {
  tanggal: number;
  tanggal_lengkap: string;
  hari: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
};

export type PrayerScheduleItem = EquranSchedule & {
  tanggal_iso: string;
};

export type PekanbaruPrayerSchedule = {
  wilayah: "Kota Pekanbaru";
  provinsi: "Riau";
  sumber: "EQuran.id / Bimas Islam Kemenag RI";
  timeZone: typeof PEKANBARU_TIME_ZONE;
  generatedAt: string;
  now: {
    hari: string;
    tanggal_lengkap: string;
    tanggal_iso: string;
    jam: string;
  };
  jadwal: PrayerScheduleItem;
  jadwalBesok: PrayerScheduleItem | null;
};

type DateParts = {
  day: number;
  month: number;
  year: number;
  isoDate: string;
};

function getPekanbaruDateParts(date = new Date()): DateParts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PEKANBARU_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const year = Number(values.year);
  const month = Number(values.month);
  const day = Number(values.day);

  return {
    day,
    month,
    year,
    isoDate: `${values.year}-${values.month}-${values.day}`,
  };
}

function formatDateId(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    timeZone: PEKANBARU_TIME_ZONE,
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatWeekdayId(date = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: PEKANBARU_TIME_ZONE,
    weekday: "long",
  }).format(date);
}

function formatClockId(date = new Date()) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
    timeZone: PEKANBARU_TIME_ZONE,
  })
    .format(date)
    .replace(/\./g, ":");
}

function normalizeSchedule(schedule: EquranSchedule): PrayerScheduleItem {
  const tanggalIso = schedule.tanggal_lengkap;

  return {
    ...schedule,
    tanggal_iso: tanggalIso,
    tanggal_lengkap: formatDateId(tanggalIso),
  };
}

function getNextMonth(parts: DateParts) {
  if (parts.month === 12) {
    return { month: 1, year: parts.year + 1 };
  }

  return { month: parts.month + 1, year: parts.year };
}

async function fetchMonthlySchedule(month: number, year: number): Promise<EquranSchedule[]> {
  const response = await fetch(EQURAN_SHALAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 * 60 * 6 },
    body: JSON.stringify({
      provinsi: "Riau",
      kabkota: "Kota Pekanbaru",
      bulan: month,
      tahun: year,
    }),
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil jadwal sholat Pekanbaru.");
  }

  const json = await response.json();
  const schedule = json?.data?.jadwal;

  if (!Array.isArray(schedule)) {
    throw new Error("Format jadwal sholat tidak sesuai.");
  }

  return schedule;
}

export async function getPekanbaruPrayerSchedule(date = new Date()): Promise<PekanbaruPrayerSchedule> {
  const today = getPekanbaruDateParts(date);
  const monthlySchedule = await fetchMonthlySchedule(today.month, today.year);
  const todaySchedule = monthlySchedule.find((item) => item.tanggal === today.day);

  if (!todaySchedule) {
    throw new Error("Jadwal sholat hari ini tidak ditemukan.");
  }

  let tomorrowSchedule = monthlySchedule.find((item) => item.tanggal === today.day + 1) ?? null;

  if (!tomorrowSchedule) {
    const nextMonth = getNextMonth(today);
    const nextMonthlySchedule = await fetchMonthlySchedule(nextMonth.month, nextMonth.year);
    tomorrowSchedule = nextMonthlySchedule.find((item) => item.tanggal === 1) ?? null;
  }

  return {
    wilayah: "Kota Pekanbaru",
    provinsi: "Riau",
    sumber: "EQuran.id / Bimas Islam Kemenag RI",
    timeZone: PEKANBARU_TIME_ZONE,
    generatedAt: date.toISOString(),
    now: {
      hari: formatWeekdayId(date),
      tanggal_lengkap: formatDateId(today.isoDate),
      tanggal_iso: today.isoDate,
      jam: formatClockId(date),
    },
    jadwal: normalizeSchedule(todaySchedule),
    jadwalBesok: tomorrowSchedule ? normalizeSchedule(tomorrowSchedule) : null,
  };
}

export function getPekanbaruFallbackSchedule(date = new Date()): PekanbaruPrayerSchedule {
  const today = getPekanbaruDateParts(date);

  return {
    wilayah: "Kota Pekanbaru",
    provinsi: "Riau",
    sumber: "EQuran.id / Bimas Islam Kemenag RI",
    timeZone: PEKANBARU_TIME_ZONE,
    generatedAt: date.toISOString(),
    now: {
      hari: formatWeekdayId(date),
      tanggal_lengkap: formatDateId(today.isoDate),
      tanggal_iso: today.isoDate,
      jam: formatClockId(date),
    },
    jadwal: {
      tanggal: today.day,
      tanggal_iso: today.isoDate,
      tanggal_lengkap: formatDateId(today.isoDate),
      hari: formatWeekdayId(date),
      imsak: "--:--",
      subuh: "--:--",
      terbit: "--:--",
      dhuha: "--:--",
      dzuhur: "--:--",
      ashar: "--:--",
      maghrib: "--:--",
      isya: "--:--",
    },
    jadwalBesok: null,
  };
}

export { PEKANBARU_TIME_ZONE, PEKANBARU_UTC_OFFSET };
