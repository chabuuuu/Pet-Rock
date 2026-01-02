export type InteractionType = 'polish' | 'praise' | 'talk' | 'poke';

const MESSAGES = [
  "Hòn đá ghi nhận nỗ lực của bạn nhưng đếch quan tâm.",
  "Hòn đá cảm thấy nhột.",
  "Hòn đá đang suy nghĩ về kinh tế vĩ mô.",
  "Bạn vừa lãng phí 3 giây cuộc đời để lau một cục đá.",
  "Hòn đá phớt lờ bạn thành công.",
  "Đừng chạm vào, hòn đá đang hướng nội.",
];

const SPECIAL_MESSAGES: Record<InteractionType, string[]> = {
  polish: ["Cứng hơn rồi đấy!", "Bóng loáng như cái đầu hói của sếp."],
  praise: ["Hòn đá đánh giá cao gu thẩm mỹ của bạn.", "Nữa đi, đá thích nghe người khác nịnh."],
  talk: ["Hòn đá đang lắng nghe... hoặc ngủ gật.", "Rất sâu sắc. Đá tiếp thu 0%."],
  poke: ["Đừng chọc, đá cọc!", "Rung lắc dữ dội!"],
};

export const getRandomMessage = (type: InteractionType): string => {
  const pool = [...MESSAGES, ...(SPECIAL_MESSAGES[type] || [])];
  return pool[Math.floor(Math.random() * pool.length)];
};
