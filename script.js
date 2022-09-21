// 変数を初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const innerbox = document.getElementById('innerbox');
const music = new Audio('audio/mis.mp3');
const start = document.getElementById('button');
const count = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
  'h1 h2 h3 h4 h5 h6', 'HTML CSS', 'console.log',
  'ul ol li', 'dl dt dd', 'function', 'if else if else',
  'let const', 'stylesheet', 'while', 'alert', '=>',
  'array', 'script src', 'addClass', 'removeClass',
  'toggleClass','constructor','node', 'head', 'body',
  'header', 'main', 'footer', 'getElementById', 'addEventlistener',
  'querySelector', 'textContent', 'innerWidth', 'innerHeight', 'length',
  'prepend', 'append', 'after', 'click', 'mousedown', 'submit', 'scroll',
  'setTimeout', 'break'
];


// ランダムなテキストを表示する
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    innerbox.classList.add('mistyped');
    music.play();
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      innerbox.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
  createText();
  }
};

// タイピングスキルのランク判定
const rankCheck = score => {

  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `Cランクです。\nBランクまで後${100 - score}文字です。`;
  } else if(score < 200) {
    text = `Bランクです。\nAランクまで後${200 - score}文字です。`;
  } else if(score < 300) {
    text = `Aランクです。\nSランクまで後${300 - score}文字です。`;
  } else if(score > 300) {
    text = `Sランクです。\nCongratulations!`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました。\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == ture) {window.location.reload()};
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素(p要素)を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'START!!ボタンで開始';