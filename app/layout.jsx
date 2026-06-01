import "./globals.css";

export const metadata = {
  title: "泡泡尾巴宠物洗护店",
  description: "犬猫洗澡、美容修剪、皮毛养护和预约到店服务。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
