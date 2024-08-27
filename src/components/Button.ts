import Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Container {
  private buttonImage: Phaser.GameObjects.Image;
  private buttonText?: Phaser.GameObjects.Text; // 将 buttonText 设置为可选
  private defaultTexture: string; // 默认状态的纹理
  private clickedTexture: string; // 点击后的纹理

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    defaultTexture: string, // 默认状态下的纹理
    clickedTexture: string, // 点击状态下的纹理
    width?: number, // 可选宽度参数
    height?: number, // 可选高度参数
    text?: string, // 将 text 设置为可选
    style?: Phaser.Types.GameObjects.Text.TextStyle,
    callback?: () => void
  ) {
    super(scene, x, y);

    this.defaultTexture = defaultTexture;
    this.clickedTexture = clickedTexture;

    // 创建按钮的背景图像
    this.buttonImage = scene.add.image(0, 0, defaultTexture);

    // 如果提供了宽度和高度参数，则调整图像大小
    if (width && height) {
      this.buttonImage.setDisplaySize(width, height);
    }

    this.add(this.buttonImage);

    // 如果提供了文本，则创建按钮的文本
    if (text) {
      this.buttonText = scene.add.text(0, 0, text, style);
      this.buttonText.setOrigin(0.5, 0.5);

      // 调整文本的缩放比例，以适应按钮的大小
      if (width && height) {
        const scaleX = width / this.buttonImage.width;
        const scaleY = height / this.buttonImage.height;
        this.buttonText.setScale(Math.min(scaleX, scaleY));
      }

      this.add(this.buttonText);
    }

    // 使按钮可交互
    this.buttonImage.setInteractive();

    // 添加点击事件
    this.buttonImage.on("pointerdown", () => {
      this.buttonImage.setTexture(this.clickedTexture); // 切换到点击状态的纹理
      if (callback) {
        callback();
      }
    });

    // 添加释放事件，恢复默认状态
    this.buttonImage.on("pointerup", () => {
      this.buttonImage.setTexture(this.defaultTexture); // 恢复默认状态的纹理
    });

    // 添加鼠标移出事件，确保在鼠标移出时恢复默认状态
    this.buttonImage.on("pointerout", () => {
      this.buttonImage.setTexture(this.defaultTexture); // 恢复默认状态的纹理
    });

    // 将按钮添加到当前场景
    scene.add.existing(this);
  }

  // 可选的设置文本方法
  public setText(newText: string): void {
    if (this.buttonText) {
      this.buttonText.setText(newText);
    }
  }

  // 可选的设置文本样式方法
  public setTextStyle(style: Phaser.Types.GameObjects.Text.TextStyle): void {
    if (this.buttonText) {
      this.buttonText.setStyle(style);
    }
  }

  // 更新的设置按钮大小的方法，返回 this
  public setButtonSize(width: number, height: number): this {
    this.buttonImage.setDisplaySize(width, height);
    if (this.buttonText) {
      const scaleX = width / this.buttonImage.width;
      const scaleY = height / this.buttonImage.height;
      this.buttonText.setScale(Math.min(scaleX, scaleY));
    }
    return this;
  }
}
