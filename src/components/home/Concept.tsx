import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { photoStyle } from '@/lib/images';
import styles from './Concept.module.scss';

// 「素材・火・空間」の3つのこだわり。写真（または代替）＋テキストを交互配置。
const ITEMS = [
  {
    no: '01', en: 'Premium Wagyu', image: 'concept-wagyu',
    title: 'A5ランク黒毛和牛',
    body: '厳選した生産者から直接仕入れるA5ランク黒毛和牛のみを使用。脂の甘み、深い旨み、とろける食感——最高の素材だけが最高の一品を生みます。',
  },
  {
    no: '02', en: 'Charcoal Fire', image: 'concept-charcoal',
    title: '備長炭の遠赤外線',
    body: '和歌山産の最高級備長炭を使用。遠赤外線で内側まで均一に火を通し、余分な脂を落としながら旨みを閉じ込めます。炭火の香りが食体験を深めます。',
  },
  {
    no: '03', en: 'Private Room', image: 'concept-room',
    title: '完全個室の静寂',
    body: '全席が完全個室。2名様の和モダン個室から最大12名様の大個室まで。接待・記念日・デートなど、大切な時間を周囲を気にせずお過ごしいただけます。',
  },
];

export function Concept() {
  return (
    <section className="section container" id="concept">
      <SectionHeading
        label="Our Philosophy"
        title="三つのこだわり"
        description="素材、火、空間。黒耀が妥協しない、三つの約束。"
      />
      <div className={styles.grid}>
        {ITEMS.map((item, i) => (
          <Reveal key={item.no} delay={i * 80} className={styles.item}>
            <div className={styles.vis} style={photoStyle(item.image, 'rgba(10,8,5,.2), rgba(10,8,5,.6)')}>
              <span className={styles.num}>{item.no}</span>
              <span className={styles.tag}>{item.en}</span>
            </div>
            <div className={styles.text}>
              <span className={styles.en}>{item.en}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <span className={styles.rule} aria-hidden="true" />
              <p className={styles.body}>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
