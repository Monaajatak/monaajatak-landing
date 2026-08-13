<template>
  <div class="alt-page" :class="{ 'has-panel': fullPlayerOpen }">
    <!-- ══════════ App Bar ══════════ -->
    <header class="alt-appbar">
      <div class="ab-text">
        <h1 class="ab-title">المكتبة الصوتية</h1>
        <span class="ab-subtitle">استمع إلى القرآن الكريم</span>
      </div>
    </header>

    <!-- ══════════ Segmented Control ══════════ -->
    <div class="seg" role="tablist">
      <div class="seg-thumb" :style="segThumbStyle"></div>
      <button v-for="(seg, i) in segments" :key="seg.id" :class="['seg-item', { on: activeTab === seg.id }]" role="tab" @click="activeTab = seg.id">
        {{ seg.label }}
      </button>
    </div>

    <!-- ══════════ Loading / Error ══════════ -->
    <div v-if="loading" class="alt-state">
      <div class="skel-list">
        <div v-for="i in 8" :key="i" class="skel-tile">
          <div class="skel-star"></div>
          <div class="skel-lines"><i></i><i></i></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="alt-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="loadAll">إعادة المحاولة</button>
    </div>

    <!-- ══════════ Content ══════════ -->
    <div v-else class="alt-content">
      <!-- ────────── RECITERS TAB ────────── -->
    <div v-if="activeTab === 'reciters'" class="reciters-wrap">
        <div class="search-row">
          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input v-model="searchQuery" type="text" placeholder="ابحث عن اسم القارئ..." />
            <button v-if="searchQuery" class="search-clear" aria-label="مسح" @click="searchQuery = ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <button
            :class="['sq-btn', { on: showFavoritesOnly }]"
            :aria-label="showFavoritesOnly ? 'إخفاء المفضلة' : 'إظهار المفضلة فقط'"
            @click="showFavoritesOnly = !showFavoritesOnly"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="showFavoritesOnly ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>

          <button :class="['sq-btn', { on: hasFilters }]" aria-label="تصفية" @click="showFilterSheet = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            <i v-if="hasFilters" class="sq-dot"></i>
          </button>
        </div>

        <!-- filter chips -->
        <div v-if="hasFilters || showFavoritesOnly" class="chips-row">
          <span v-if="showFavoritesOnly" class="chip-tag">
            المفضلة
            <button aria-label="إلغاء" @click="showFavoritesOnly = false"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
          </span>
          <span v-if="selectedRewaya" class="chip-tag">
            {{ rewayaName(selectedRewaya) }}
            <button aria-label="إلغاء" @click="selectedRewaya = ''"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
          </span>
          <span v-if="selectedSura" class="chip-tag">
            سورة {{ surahName(selectedSura) }}
            <button aria-label="إلغاء" @click="selectedSura = null"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
          </span>
          <button class="chips-clear" @click="clearAllFilters">مسح الكل</button>
        </div>

        <div v-if="filteredReciters.length === 0" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <p v-if="showFavoritesOnly">لا يوجد قراء في المفضلة</p>
          <p v-else>لا توجد نتائج</p>
        </div>

        <div class="rec-wrap">
          <!-- alphabet rail -->
          <div v-if="letters.length" class="alphabet-rail" aria-hidden="true">
            <button
              v-for="letter in letters"
              :key="letter"
              :class="{ on: currentLetter === letter }"
              @click="scrubTo(letter)"
              @mouseenter="scrubTo(letter)"
            >{{ letter }}</button>
          </div>

          <!-- list -->
          <div class="nt-list">
            <template v-for="group in groupedReciters" :key="group.letter">
              <div class="letter-head" :id="'letter-' + group.letter">
                <span>{{ group.letter }}</span><small>{{ toArNum(group.list.length) }}</small>
              </div>
              <NumberedTile
                v-for="(r, idx) in group.list"
                :key="r.id"
                :number="toArNum(reciterNumber(r) + 1)"
                accent="var(--primary)"
                :title="r.name"
                :subtitle="r.moshaf?.[0]?.name || 'تلاوات القرآن'"
                :title-badge="`${toArNum(r.moshaf?.[0]?.surahTotal || 0)} سورة`"
                :on-tap="() => openReciter(r)"
              >
                <template #trailing>
                  <button class="tile-fav" :class="{ on: store.favoriteReciterIds.value.has(r.id) }" aria-label="مفضلة" @click.stop="store.toggleFavoriteReciter(r.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" :fill="store.favoriteReciterIds.value.has(r.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </template>
              </NumberedTile>
            </template>
          </div>
        </div>
      </div>

      <!-- ────────── RADIOS TAB ────────── -->
      <div v-else-if="activeTab === 'radios'" class="radios-wrap">
        <div class="search-row">
          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input v-model="radioQuery" type="text" placeholder="ابحث عن إذاعة..." />
            <button v-if="radioQuery" class="search-clear" aria-label="مسح" @click="radioQuery = ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        <!-- category chips -->
        <div class="radio-cats">
          <button
            v-for="cat in radioCategories"
            :key="cat.id"
            :class="['rcat', { on: selectedRadioCategory === cat.id }]"
            @click="selectedRadioCategory = cat.id"
          >{{ cat.name }}</button>
        </div>

        <div v-if="filteredRadios.length === 0" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>
          <p>لا توجد إذاعات مطابقة</p>
        </div>

        <div class="nt-list">
          <NumberedTile
            v-for="(radio, idx) in filteredRadios"
            :key="radio.id"
            :number="toArNum(idx + 1)"
            accent="var(--primary)"
            :title="radio.name"
            :subtitle="radio.episodes?.length ? `${toArNum(radio.episodes.length)} حلقة` : 'بث مباشر'"
            :on-tap="() => playRadio(radio)"
          >
            <template #trailing>
              <button class="tile-fav" :class="{ on: store.favoriteRadioIds.value.has(radio.id) }" aria-label="مفضلة" @click.stop="store.toggleFavoriteRadio(radio.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" :fill="store.favoriteRadioIds.value.has(radio.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
              <button v-if="radio.episodes?.length" class="ep-btn" aria-label="الحلقات" @click.stop="openEpisodes(radio)">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
              </button>
              <span :class="['radio-team', { live: isCurrentRadio(radio) }]">
                <i v-if="isCurrentRadio(radio)"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </span>
            </template>
          </NumberedTile>
        </div>
      </div>

      <!-- ────────── PLAYLISTS TAB ────────── -->
      <div v-else class="playlists-wrap">
        <div class="nt-list">
          <div class="pl-card" @click="showCreatePlaylist = true">
            <span class="pl-add">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </span>
            <span class="pl-add-tx">
              <strong>إنشاء قائمة جديدة</strong>
              <small>أنشئ قائمة تشغيل بالسور المفضلة لديك</small>
            </span>
          </div>

          <div v-if="store.playlists.value.length === 0" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            <p>لا توجد قوائم تشغيل بعد</p>
          </div>

          <div
            v-for="pl in store.playlists.value"
            :key="pl.id"
            class="pl-tile"
            @click="openPlaylistDetail(pl)"
          >
            <span class="pl-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/></svg>
            </span>
            <span class="pl-info">
              <strong>{{ pl.name }}</strong>
              <small>{{ toArNum(pl.items.length) }} عنصر</small>
            </span>
            <button class="pl-more" aria-label="خيارات" @click.stop="pl.opt = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ Mini Player ══════════ -->
    <MiniPlayer v-if="player.currentTrack.value && !fullPlayerOpen" @open="fullPlayerOpen = true" />

    <!-- ══════════ Full Player ══════════ -->
    <FullPlayer v-if="fullPlayerOpen" @close="fullPlayerOpen = false" />

    <!-- ══════════ Filter Sheet ══════════ -->
    <div v-if="showFilterSheet" class="sheet-pop" @click.self="showFilterSheet = false">
      <div class="sheet">
        <div class="sheet-handle"></div>
        <h3>تصفية القراء</h3>

        <label class="sheet-label">الرواية</label>
        <div class="sheet-select" @click="showRiwayaPick = true">
          <span>{{ selectedRewaya ? rewayaName(selectedRewaya) : 'جميع الروايات' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        <label class="sheet-label">السورة</label>
        <div class="sheet-select" @click="showSuraPick = true">
          <span>{{ selectedSura ? `سورة ${surahName(selectedSura)}` : 'جميع السور' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>

        <div class="sheet-actions">
          <button class="s-cancel" @click="clearAllFilters; showFilterSheet = false">مسح</button>
          <button class="s-apply" @click="showFilterSheet = false">تطبيق</button>
        </div>
      </div>
    </div>

    <!-- ══════════ Riwaya picker ══════════ -->
    <div v-if="showRiwayaPick" class="sheet-pop" @click.self="showRiwayaPick = false">
      <div class="sheet">
        <div class="sheet-handle"></div>
        <h3>الرواية</h3>
        <div class="pick-list">
          <button :class="['pick-item', { on: !selectedRewaya }]" @click="selectedRewaya = ''; showRiwayaPick = false">جميع الروايات</button>
          <button v-for="r in riwayat" :key="r.id" :class="['pick-item', { on: selectedRewaya === r.id }]" @click="selectedRewaya = r.id; showRiwayaPick = false">{{ r.name }}</button>
        </div>
      </div>
    </div>

    <!-- ══════════ Sura picker ══════════ -->
    <div v-if="showSuraPick" class="sheet-pop" @click.self="showSuraPick = false">
      <div class="sheet">
        <div class="sheet-handle"></div>
        <h3>السورة</h3>
        <div class="pick-list">
          <button :class="['pick-item', { on: !selectedSura }]" @click="selectedSura = null; showSuraPick = false">جميع السور</button>
          <button v-for="s in suwar" :key="s.id" :class="['pick-item', { on: selectedSura === s.id }]" @click="selectedSura = s.id; showSuraPick = false">سورة {{ s.name }}</button>
        </div>
      </div>
    </div>

    <!-- ══════════ Episodes Sheet ══════════ -->
    <div v-if="episodesRadio" class="sheet-pop" @click.self="episodesRadio = null">
      <div class="sheet">
        <div class="sheet-handle"></div>
        <div class="eps-head">
          <div class="eps-tx">
            <h3>{{ episodesRadio.name }}</h3>
            <small>{{ toArNum(episodesRadio.episodes.length) }} حلقة</small>
          </div>
          <button class="eps-close" aria-label="إغلاق" @click="episodesRadio = null">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="nt-list">
          <NumberedTile
            v-for="(ep, i) in episodesRadio.episodes"
            :key="ep.url"
            :number="toArNum(i + 1)"
            accent="var(--primary)"
            :title="ep.name"
            :on-tap="() => playEpisode(ep)"
          >
            <template #trailing>
              <span class="surah-play">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </span>
            </template>
          </NumberedTile>
        </div>
      </div>
    </div>

    <!-- ══════════ Create playlist Sheet ══════════ -->
    <div v-if="showCreatePlaylist" class="sheet-pop" @click.self="showCreatePlaylist = false">
      <div class="sheet">
        <div class="sheet-handle"></div>
        <h3>قائمة تشغيل جديدة</h3>
        <div class="create-box">
          <input v-model="newPlaylistName" class="create-input" placeholder="اسم القائمة" @keyup.enter="confirmCreatePlaylist" />
          <div class="sheet-actions">
            <button class="s-cancel" @click="showCreatePlaylist = false">إلغاء</button>
            <button class="s-apply" @click="confirmCreatePlaylist">إنشاء</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ Playlist detail + options ══════════ -->
    <div v-if="playlistDetail" class="sheet-pop" @click.self="closePlaylistDetail">
      <div class="sheet sheet-lg">
        <div class="sheet-handle"></div>
        <div class="pl-detail-head">
          <h3>{{ playlistDetail.name }}</h3>
          <small>{{ toArNum(playlistDetail.items.length) }} عنصر</small>
        </div>
        <div v-if="playlistDetail.items.length === 0" class="empty-state">
          <p>القائمة فارغة — أضف سوراً من أثناء التشغيل</p>
        </div>
        <div class="nt-list">
          <NumberedTile
            v-for="(item, i) in playlistDetail.items"
            :key="i"
            :number="toArNum(i + 1)"
            accent="var(--primary)"
            :title="item.surahName"
            :subtitle="item.reciterName"
            :on-tap="() => playPlaylistItem(playlistDetail, i)"
          >
            <template #trailing>
              <button class="ep-btn" aria-label="إزالة" @click.stop="store.removeFromPlaylist(playlistDetail.id, i)">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </template>
          </NumberedTile>
        </div>
        <div class="sheet-actions">
          <button class="s-cancel" @click="renamePrompt(playlistDetail)">إعادة التسمية</button>
          <button class="s-delete" @click="deletePlaylist(playlistDetail.id)">حذف القائمة</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAudioPlayer } from '~/composables/useAudioPlayer'
import { useAudioLibraryStore } from '~/composables/useAudioLibraryStore'
import { reciterSlug } from '~/utils/reciterSlug'
import NumberedTile from '~/components/AudioLibrary/NumberedTile.vue'
import MiniPlayer from '~/components/AudioLibrary/MiniPlayer.vue'
import FullPlayer from '~/components/AudioLibrary/FullPlayer.vue'

useHead(() => ({
  title: 'المكتبة الصوتية | مُناجاتك',
  meta: [
    { name: 'description', content: 'استمع للقرآن الكريم مباشرة بأصوات أشهر القراء والإذاعات القرآنية عبر المكتبة الصوتية في مُناجاتك.' }
  ]
}))

const player = useAudioPlayer()
const store = useAudioLibraryStore()
const router = useRouter()
const route = useRoute()

const segments = [
  { id: 'reciters', label: 'التلاوات' },
  { id: 'radios', label: 'الإذاعة الصوتية' },
  { id: 'playlists', label: 'قوائم التشغيل' },
]

const activeTab = ref('reciters')
const fullPlayerOpen = ref(false)

// ── data ──
const loading = ref(true)
const error = ref('')
const reciters = ref([])
const suwar = ref([])
const riwayat = ref([])
const radios = ref([])

const searchQuery = ref('')
const radioQuery = ref('')
const showFavoritesOnly = ref(false)
const selectedRewaya = ref('')
const selectedSura = ref(null)
const selectedRadioCategory = ref('favorites')

const showFilterSheet = ref(false)
const showRiwayaPick = ref(false)
const showSuraPick = ref(false)
const episodesRadio = ref(null)
const showCreatePlaylist = ref(false)
const newPlaylistName = ref('')
const playlistDetail = ref(null)
const currentLetter = ref('')

// ══════════ helpers ══════════
const toArNum = player.toArabicDigits
const surahName = (id) => suwar.value.find((s) => s.id === id)?.name || `سورة ${id}`
const rewayaName = (id) => riwayat.value.find((r) => r.id === id)?.name || 'رواية'

// ══════════ load ══════════
const loadAll = async () => {
  loading.value = true
  error.value = ''
  try {
    const [rRes, sRes, rwRes, rdRes] = await Promise.all([
      $fetch('/api/mp3quran/reciters'),
      $fetch('/api/mp3quran/suwar'),
      $fetch('/api/mp3quran/riwayat'),
      $fetch('/api/mp3quran/radios'),
    ])
    reciters.value = rRes.reciters || []
    suwar.value = sRes.suwar || []
    riwayat.value = rwRes.riwayat || []
    radios.value = (rdRes.radios || []).filter((r) => r.name)
  } catch (e) {
    console.error(e)
    error.value = 'حدث خطأ أثناء الاتصال بخادم المكتبة الصوتية.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadAll()
  applyDeepLink()
})

/**
 * فتح ما طلبه رابط المشاركة القادم من التطبيق:
 * `/listen?tab=radios&radio=<id>[&ep=<n>]`.
 *
 * هذه هي وجهة زرّ "استمع الآن على الموقع" في صفحة `/app/radio`، فبدونها يهبط
 * الزائر على قائمة الإذاعات ويبحث عن إذاعته بنفسه.
 */
const applyDeepLink = () => {
  const q = route.query
  if (q.tab && segments.some((s) => s.id === q.tab)) activeTab.value = q.tab

  const radioId = parseInt(q.radio, 10)
  if (Number.isNaN(radioId)) return

  const radio = radios.value.find((r) => r.id === radioId)
  if (!radio) return

  activeTab.value = 'radios'
  const epIndex = parseInt(q.ep, 10)
  const episode = Number.isNaN(epIndex) ? null : (radio.episodes || [])[epIndex]
  if (episode) {
    episodesRadio.value = radio
    playEpisode(episode)
    return
  }
  playRadio(radio)
}

// ══════════ reciters filtering / grouping ══════════
const hasFilters = computed(() => !!selectedRewaya.value || selectedSura.value != null)

const filteredReciters = computed(() => {
  let list = reciters.value
  if (selectedRewaya.value) {
    list = list.filter((r) => r.moshaf?.some((m) => m.rewayaId == selectedRewaya.value))
  }
  if (selectedSura.value != null) {
    list = list.filter((r) =>
      r.moshaf?.some((m) => String(m.surahList || '').split(',').includes(String(selectedSura.value))),
    )
  }
  if (showFavoritesOnly.value) {
    list = list.filter((r) => store.favoriteReciterIds.value.has(r.id))
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim()
    list = list.filter((r) => r.name.includes(q))
  }
  return list
})

const letterOf = (name) => {
  const ch = (name || '').trim().charAt(0) || '#'
  if (ch === 'أ' || ch === 'إ' || ch === 'آ') return 'ا'
  return ch
}

const groupedReciters = computed(() => {
  const groups = {}
  filteredReciters.value.forEach((r) => {
    const l = letterOf(r.name)
    if (!groups[l]) groups[l] = []
    groups[l].push(r)
  })
  return Object.keys(groups)
    .sort((a, b) => a.localeCompare(b, 'ar'))
    .map((letter) => ({ letter, list: groups[letter] }))
})

const letters = computed(() => groupedReciters.value.map((g) => g.letter))

// map reciter -> global index to build its number
const reciterNumber = (r) => filteredReciters.value.indexOf(r)

const scrubTo = (letter) => {
  currentLetter.value = letter
  const el = document.getElementById(`letter-${letter}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setTimeout(() => { currentLetter.value = '' }, 800)
}

const clearAllFilters = () => {
  selectedRewaya.value = ''
  selectedSura.value = null
  showFavoritesOnly.value = false
}

const openReciter = (r) => {
  router.push(`/listen/${reciterSlug(r)}`)
}

const playRadio = (radio) => {
  player.playTrack({
    url: radio.url,
    title: radio.name,
    subtitle: radio.category || 'إذاعة القرآن الكريم',
    id: radio.id,
    type: 'radio',
  }, [])
  fullPlayerOpen.value = true
}

const isCurrentRadio = (radio) => player.currentTrack.value?.url === radio.url

const playEpisode = (ep) => {
  const radio = episodesRadio.value
  player.playTrack({
    url: ep.url,
    title: ep.name,
    subtitle: radio?.name || 'إذاعة القرآن الكريم',
    // معرّف الإذاعة وموضع الحلقة — يخرجان في رابط المشاركة فيفتح التطبيق
    // نفس الحلقة لا أول الأرشيف.
    id: radio?.id ?? null,
    episodeIndex: radio ? (radio.episodes || []).indexOf(ep) : null,
    type: 'radio',
  }, [])
  episodesRadio.value = null
  fullPlayerOpen.value = true
}

const openEpisodes = (radio) => { episodesRadio.value = radio }

// ══════════ radios categories ══════════
const radioCategories = computed(() => {
  const cats = new Set(radios.value.map((r) => r.category).filter(Boolean))
  const normalized = [...cats].sort((a, b) => a.localeCompare(b, 'ar'))
  return [{ id: 'favorites', name: 'المفضلة' }, { id: 'all', name: 'الكل' }, ...normalized.map((c) => ({ id: c, name: c }))]
})

const filteredRadios = computed(() => {
  let list = radios.value
  if (selectedRadioCategory.value === 'favorites') {
    list = list.filter((r) => store.favoriteRadioIds.value.has(r.id))
  } else if (selectedRadioCategory.value !== 'all') {
    list = list.filter((r) => r.category === selectedRadioCategory.value)
  }
  if (radioQuery.value.trim()) {
    const q = radioQuery.value.trim()
    list = list.filter((r) => r.name.includes(q))
  }
  return list
})

// ══════════ playlists ══════════
const confirmCreatePlaylist = () => {
  const name = newPlaylistName.value.trim()
  if (!name) return
  store.createPlaylist(name)
  newPlaylistName.value = ''
  showCreatePlaylist.value = false
}

const openPlaylistDetail = (pl) => { playlistDetail.value = pl }

const closePlaylistDetail = () => {
  if (playlistDetail.value?.opt) {
    delete playlistDetail.value.opt
    return
  }
  playlistDetail.value = null
}

const renamePrompt = (pl) => {
  const name = prompt('الاسم الجديد', pl.name)
  if (name && name.trim()) store.renamePlaylist(pl.id, name.trim())
}

const deletePlaylist = (id) => {
  if (confirm('حذف القائمة نهائياً؟')) {
    store.deletePlaylist(id)
    playlistDetail.value = null
  }
}

const playPlaylistItem = (pl, index) => {
  const items = pl.items
  if (!items[index]) return
  const queue = items.map((it) => ({
    url: it.audioUrl,
    title: it.surahName,
    subtitle: it.reciterName,
    reciterId: it.reciterId,
    surahId: it.surahId,
    moshafId: it.moshafId,
    type: 'surah',
  }))
  player.playTrack(queue[index], queue)
  fullPlayerOpen.value = true
}

// ══════════ segmented thumb ══════════
const segIndex = computed(() => segments.findIndex((s) => s.id === activeTab.value))
const segThumbStyle = computed(() => ({
  width: `calc(100% / ${segments.length})`,
  insetInlineStart: `calc(${segIndex.value} * (100% / ${segments.length}))`,
}))
</script>

<style scoped>
.alt-page {
  min-height: 100vh;
  position: relative;
  padding: 0 0 96px;
  background: var(--body-bg);
}

/* ══════ App bar ══════ */
.alt-appbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 720px;
  margin: 0 auto;
  padding: 16px 20px 0;
}
.ab-text { min-width: 0; }
.ab-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ab-subtitle {
  font-size: 12px;
  color: var(--muted);
}
.ab-action {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--muted);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.ab-action:hover { background: rgba(var(--primary-rgb), 0.08); color: var(--primary); }

/* ══════ Segmented control ══════ */
.seg {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 720px;
  margin: 14px auto 10px;
  padding: 0 20px;
}
.seg-thumb {
  position: absolute;
  top: 0;
  bottom: 0;
  inset-inline-start: 0;
  background: var(--surface);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
  transition: inset-inline-start 0.25s ease;
  z-index: 0;
}
:global(html.dark) .seg-thumb { background: #334155; box-shadow: none; }
.seg-item {
  position: relative;
  z-index: 1;
  padding: 8px 0;
  border: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.25s ease;
}
.seg-item.on {
  color: var(--primary);
  font-weight: 700;
}
:global(html.dark) .seg-item.on { color: #fff; }

/* ══════ state / skeleton ══════ */
.alt-state {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--muted);
}
.alt-state p { font-size: 14px; }

.skel-list { width: 100%; display: flex; flex-direction: column; gap: 6px; }
.skel-tile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--surface);
  border-radius: 12px;
}
.skel-star {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(var(--text-rgb), 0.06), rgba(var(--text-rgb), 0.12), rgba(var(--text-rgb), 0.06));
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}
.skel-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.skel-lines i {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(var(--text-rgb), 0.06), rgba(var(--text-rgb), 0.12), rgba(var(--text-rgb), 0.06));
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}
.skel-lines i:nth-child(1) { width: 55%; }
.skel-lines i:nth-child(2) { width: 35%; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* ══════ content ══════ */
.alt-content, .reciters-wrap, .radios-wrap, .playlists-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
}

/* search row */
.search-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 12px;
  background: var(--surface);
  border-radius: 10px;
  color: var(--faint);
}
.search-box:focus-within { box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.18); }
.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
}
.search-box input::placeholder { color: var(--faint); }
.search-clear {
  border: none;
  background: transparent;
  color: var(--faint);
  display: flex;
  padding: 4px;
  cursor: pointer;
}

.sq-btn {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  border: none;
  background: var(--surface);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.sq-btn.on {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
}
.sq-dot {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid var(--surface);
}

/* chips */
.chips-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 0 0;
}
.chip-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 220px;
  padding: 5px 8px;
  border-radius: 8px;
  background: rgba(var(--primary-rgb), 0.08);
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
}
.chip-tag button {
  border: none;
  background: transparent;
  color: inherit;
  display: flex;
  cursor: pointer;
  padding: 0;
}
.chips-clear {
  border: none;
  background: transparent;
  color: var(--primary);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  margin-right: auto;
  cursor: pointer;
}

/* reciters: rail + list */
.rec-wrap {
  display: flex;
  gap: 0;
  margin-top: 6px;
}
.alphabet-rail {
  width: 26px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 2px;
  gap: 1px;
}
.alphabet-rail button {
  background: transparent;
  border: none;
  color: var(--faint);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 0;
  cursor: pointer;
  line-height: 1.4;
  transition: color var(--transition-fast), transform var(--transition-fast);
}
.alphabet-rail button:hover { color: var(--primary); transform: scale(1.2); }
.alphabet-rail button.on { color: var(--primary); font-weight: 900; transform: scale(1.25); }

.nt-list {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.letter-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 4px 8px;
}
.letter-head span { font-size: 14px; font-weight: 800; color: var(--primary); }
.letter-head small {
  font-size: 10px;
  font-weight: 700;
  color: var(--faint);
  background: rgba(var(--text-rgb), 0.05);
  padding: 1px 8px;
  border-radius: 999px;
}

/* tile extras */
.tile-fav {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: var(--faint);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.tile-fav:hover { color: #f43f5e; background: rgba(244, 63, 94, 0.08); }
.tile-fav.on { color: #f43f5e; }

.surah-play {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.07);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.surah-play.on {
  background: var(--primary);
  color: #fff;
}

/* radios cats */
.radio-cats {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 12px 0 8px;
  scrollbar-width: none;
}
.radio-cats::-webkit-scrollbar { display: none; }
.rcat {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.rcat.on {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  font-weight: 700;
}

.ep-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.ep-btn:hover { color: var(--primary); }

.radio-team {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.07);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.radio-team.live { background: rgba(34, 197, 94, 0.1); color: #16a34a; }
.radio-team i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  margin-left: 4px;
  animation: pulse 1.5s infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* playlists */
.pl-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(var(--primary-rgb), 0.05);
  border: 1px solid rgba(var(--primary-rgb), 0.15);
  cursor: pointer;
  margin-bottom: 10px;
}
.pl-add {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl-add-tx { display: flex; flex-direction: column; }
.pl-add-tx strong { font-size: 14px; color: var(--text); }
.pl-add-tx small { font-size: 11px; color: var(--muted); }

.pl-tile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 12px;
  background: var(--surface);
  border: var(--border);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}
.pl-tile:hover { border-color: rgba(var(--primary-rgb), 0.35); }
.pl-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), rgba(var(--primary-rgb), 0.7));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pl-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.pl-info strong { font-size: 14px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pl-info small { font-size: 11px; color: var(--muted); }
.pl-more {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--faint);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* empty state */
.empty-state {
  text-align: center;
  padding: 48px 0;
  color: var(--faint);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.empty-state p { margin: 0; font-size: 14px; font-weight: 600; }

/* ══════ sheets ══════ */
.sheet-pop {
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: flex-end;
  backdrop-filter: blur(4px);
}
.sheet {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: var(--body-bg);
  border-radius: 24px 24px 0 0;
  padding: 12px 24px calc(30px + env(safe-area-inset-bottom));
  max-height: 84vh;
  overflow-y: auto;
}
:global(html.dark) .sheet { background: #0f172a; }
.sheet-lg { max-height: 88vh; }
.sheet-handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(var(--text-rgb), 0.18);
  margin: 4px auto 16px;
}
.sheet h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin: 0 0 20px;
}
.sheet-label {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin: 14px 0 8px;
}
.sheet-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 14px;
  border-radius: 10px;
  background: var(--surface);
  border: var(--border);
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
}
.sheet-actions {
  display: flex;
  gap: 12px;
  margin-top: 22px;
}
.s-cancel {
  flex: 1;
  padding: 14px;
  border: none;
  background: transparent;
  color: var(--primary);
  font-family: var(--font-body);
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
}
.s-apply {
  flex: 2;
  padding: 14px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
}
.s-delete {
  flex: 2;
  padding: 14px;
  border: none;
  background: rgba(244, 63, 94, 0.1);
  color: #e11d48;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
}

/* pickers */
.pick-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 55vh;
  overflow-y: auto;
}
.pick-item {
  text-align: right;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.pick-item.on {
  background: rgba(var(--primary-rgb), 0.08);
  border-color: rgba(var(--primary-rgb), 0.25);
  color: var(--primary);
}

/* episodes */
.eps-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}
.eps-tx h3 { margin: 0; text-align: right; font-size: 16px; font-weight: 700; color: var(--text); }
.eps-tx small { font-size: 12px; color: var(--muted); }
.eps-close {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* create */
.create-box { display: flex; flex-direction: column; gap: 16px; }
.create-input {
  width: 100%;
  padding: 13px 14px;
  border: none;
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
}
.create-input:focus { outline: 2px solid rgba(var(--primary-rgb), 0.4); }

/* playlist detail */
.pl-detail-head { text-align: center; margin-bottom: 10px; }
.pl-detail-head h3 { margin: 0; }
.pl-detail-head small { color: var(--muted); font-size: 12px; }

/* responsive */
@media (max-width: 480px) {
  .alt-appbar, .seg, .alt-content, .reciters-wrap, .radios-wrap, .playlists-wrap { padding-right: 14px; padding-left: 14px; }
  .alphabet-rail { display: none; }
}

/* desktop: two-column page (CSS Grid) — appbar/seg/content aligned together on the left,
   the player sticky on the physical right; the whole unit stays centered */
@media (min-width: 1024px) {
  .alt-page {
    display: grid;
    justify-content: center;
    column-gap: 24px;
    grid-template-columns: minmax(0, 720px);
    grid-template-areas:
      'appbar'
      'seg'
      'content';
  }
  .alt-page.has-panel {
    grid-template-columns: 380px minmax(0, 720px);
    grid-template-areas:
      'panel appbar'
      'panel seg'
      'panel content';
  }
  .alt-appbar { grid-area: appbar; max-width: none; margin-inline: 0; }
  .seg { grid-area: seg; max-width: none; margin-inline: 0; }
  .alt-content, .alt-state { grid-area: content; max-width: none; margin-inline: 0; }

  .sheet-pop { align-items: center; justify-content: center; }
  .sheet {
    max-width: 440px;
    border-radius: 20px;
    padding-bottom: 24px;
  }
  .sheet-handle { display: none; }
}
</style>