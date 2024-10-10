const imageFolder = 'chara/';
const imageData = [
    { src: 'syu2.png', category: 'songo' },
    { src: 'sei2.png', category: 'songo' },
    { src: 'aben.png', category: 'songo' },
    { src: 'hugen.png', category: 'songo' },
    { src: 'jepado.png', category: 'songo' },
    { src: 'nanoka.png', category: 'songo' },
    { src: 'hisyo.png', category: 'junsyu' },
    { src: 'boothill.png', category: 'junsyu' },
    { src: 'reisio.png', category: 'junsyu' },
    { src: 'topazu.png', category: 'junsyu' },
    { src: 'zere.png', category: 'junsyu' },
    { src: 'nanoka2.png', category: 'junsyu' },
    { src: 'moze.png', category: 'junsyu' },
    { src: 'genkyo.png', category: 'junsyu' },
    { src: 'susyo.png', category: 'junsyu' },
    { src: 'tankou.png', category: 'junsyu' },
    { src: 'ranpa.png', category: 'tie' },
    { src: 'jeido.png', category: 'tie' },
    { src: 'arujen.png', category: 'tie' },
    { src: 'keigen.png', category: 'tie' },
    { src: 'seijaku.png', category: 'tie' },
    { src: 'sebaru.png', category: 'tie' },
    { src: 'helta.png', category: 'tie' },
    { src: 'himeko.png', category: 'tie' },
    { src: 'syokyu.png', category: 'kyomu' },
    { src: 'yomi.png', category: 'kyomu' },
    { src: 'swan.png', category: 'kyomu' },
    { src: 'kahuka.png', category: 'kyomu' },
    { src: 'ginro.png', category: 'kyomu' },
    { src: 'ketya.png', category: 'kyomu' },
    { src: 'ruka.png', category: 'kyomu' },
    { src: 'sanpo.png', category: 'kyomu' },
    { src: 'pera.png', category: 'kyomu' },
    { src: 'velto.png', category: 'kyomu' },
    { src: 'syu1.png', category: 'kaimetsu' },
    { src: 'sei1.png', category: 'kaimetsu' },
    { src: 'unri.png', category: 'kaimetsu' },
    { src: 'hotaru.png', category: 'kaimetsu' },
    { src: 'ingetsu.png', category: 'kaimetsu' },
    { src: 'keiryu.png', category: 'kaimetsu' },
    { src: 'jin.png', category: 'kaimetsu' },
    { src: 'misia.png', category: 'kaimetsu' },
    { src: 'setui.png', category: 'kaimetsu' },
    { src: 'hukku.png', category: 'kaimetsu' },
    { src: 'kurara.png', category: 'kaimetsu' },
    { src: 'aran.png', category: 'kaimetsu' },
    { src: 'sunday.png', category: 'tyouwa' },
    { src: 'syu3.png', category: 'tyouwa' },
    { src: 'sei3.png', category: 'tyouwa' },
    { src: 'robin.png', category: 'tyouwa' },
    { src: 'hanabi.png', category: 'tyouwa' },
    { src: 'ruanmama.png', category: 'tyouwa' },
    { src: 'kana.png', category: 'tyouwa' },
    { src: 'gyoku.png', category: 'tyouwa' },
    { src: 'teiun.png', category: 'tyouwa' },
    { src: 'buronya.png', category: 'tyouwa' },
    { src: 'aster.png', category: 'tyouwa' },
    { src: 'fofo.png', category: 'houjou' },
    { src: 'rasetu.png', category: 'houjou' },
    { src: 'gyaraga.png', category: 'houjou' },
    { src: 'rinkusu.png', category: 'houjou' },
    { src: 'byakuro.png', category: 'houjou' },
    { src: 'natasya.png', category: 'houjou' },
    { src: 'reisa.png', category: 'houjou' }
];
const MAX_SELECTION = 3;
const SELECTED_LABEL = '☑';

// タブごとの選択状態を管理するためのオブジェクト
const tabSelections = {};

//------------------------------------------------------------------------------------------------
const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');
const parentNode = document.querySelector('.parent-node');
const childNodes = document.querySelector('.child-nodes');

// 初期状態でサイドバーを隠す
sidebar.classList.add('hidden');
toggleButton.setAttribute('aria-expanded', false);
toggleButton.setAttribute('aria-label', 'メニューを開く');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden'); // hiddenクラスを切り替え
    const isExpanded = !sidebar.classList.contains('hidden');
    toggleButton.setAttribute('aria-expanded', isExpanded);
    toggleButton.setAttribute('aria-label', isExpanded ? 'メニューを閉じる' : 'メニューを開く');
});

parentNode.addEventListener('click', (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防止
    childNodes.classList.toggle('active'); // 子ノードの表示・非表示を切り替え
    const isActive = childNodes.classList.contains('active');
    parentNode.textContent = `${isActive ? '▼' : '▶'} 推しキャラランキング`; // テキストを更新
});

//------------------------------------------------------------------------------------------------

function loadImages() {
    const tabs = document.querySelectorAll('.tab-label');
    const tabContents = document.querySelectorAll('.tab-content');
    const cells = document.querySelectorAll('.cell');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // すでにアクティブなタブを再度クリックした場合、何もしない
            if (tab.classList.contains('active')) {
                return; 
            }
            // アクティブなタブを更新
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 現在のタブコンテンツを表示
            tabContents.forEach(content => {
                if (content.previousElementSibling === tab) {
                    updateImageList(category, content.querySelector('.image-list'));
                    restoreSelectionState(category); // 選択状態の復元
                }
            });
        });
    });

    // 初期表示（最初のタブをアクティブにする）
    tabs[0].click();

    function updateImageList(category, container) {
        container.innerHTML = '';
        const filteredImages = imageData.filter(img => img.category === category);

        filteredImages.forEach(imgData => {
            const imgContainer = document.createElement('div'); // 画像を囲むコンテナ
            imgContainer.classList.add('image-container');

            const img = document.createElement('img');
            img.src = `${imageFolder}${imgData.src}`;
            img.dataset.src = imgData.src;
            img.dataset.category = imgData.category;
            img.classList.add('image-item');
            img.addEventListener('click', () => handleImageClick(img, category));

            imgContainer.appendChild(img);
            container.appendChild(imgContainer);
        });
    }

    function handleImageClick(img, category) {
        const src = img.dataset.src;
        const columnMapping = {
            'kaimetsu': [0, 7, 14],
            'junsyu': [1, 8, 15],
            'kyomu': [2, 9, 16],
            'tie': [3, 10, 17],
            'songo': [4, 11, 18],
            'tyouwa': [5, 12, 19],
            'houjou': [6, 13, 20]
        };

        const positions = columnMapping[category] || [];
        const isSelected = img.classList.contains('selected');
        const tabCategory = document.querySelector('.tab-label.active').dataset.category;

        // 現在のタブの選択状態を取得
        let selectedCategory = tabSelections[tabCategory] || [];

        // すでに選択されている画像が再度クリックされた場合 -> 選択解除
        if (selectedCategory.includes(src)) {
            // 選択解除
            img.classList.remove('selected');
            removeNumberingAndBorder(img.parentElement);  // コンテナから番号と枠を削除

            // 上部の該当セルから画像を削除
            const cellIndex = selectedCategory.indexOf(src);
            if (cellIndex !== -1) {
                selectedCategory.splice(cellIndex, 1); // 選択状態リストから削除
                cells[positions[cellIndex]].innerHTML = ''; // 上部の該当セルから削除
            }

            // 再配置処理を追加
            repositionImages(tabCategory);  // 残りの画像を再配置
        } else {
            // 選択制限（3枚まで）
            if (selectedCategory.length >= MAX_SELECTION) {
                alert('選択できる画像は3枚までです');
                return;
            }

            // 新たに選択
            img.classList.add('selected');
            addNumberingAndBorder(img.parentElement, selectedCategory.length + 1);  // コンテナに番号と枠を追加

            // 上部の空きセルに画像を表示
            const availablePosition = positions.find(pos => !cells[pos].querySelector('img'));
            if (availablePosition !== undefined) {
                cells[availablePosition].innerHTML = `<img src="${imageFolder}${src}" class="selected">`;
                selectedCategory.push(src); // 選択リストに追加

                // ラベルの再配置
                updateImageNumbers(tabCategory);
            }
        }

        // 選択解除時にタブの選択リストを更新
        tabSelections[tabCategory] = selectedCategory;
    }

    function updateTabState(tabCategory) {
        // 既存の選択リストを取得
        const selectedCategory = tabSelections[tabCategory] || [];

        // 全画像の選択状態をクリア
        document.querySelectorAll('.image-grid img').forEach(img => {
            img.classList.remove('selected');
            removeNumberingAndBorder(img.parentElement);  // 全ての画像から枠と番号をクリア
        });

        // 選択されている画像を再度選択状態にする
        selectedCategory.forEach((src, index) => {
            const img = document.querySelector(`img[data-src="${src}"]`);
            if (img) {
                img.classList.add('selected');
                addNumberingAndBorder(img.parentElement, index + 1);  // 画像に番号と枠を付ける
            }
        });
    }

    function addNumberingAndBorder(container, number) {
        // 青い枠と番号を追加（コンテナに）
        container.style.border = '2px solid blue';
        let label = container.querySelector('.selected-label');
        if (!label) {
            label = document.createElement('div');
            label.className = 'selected-label';
            container.appendChild(label);
        }
        label.textContent = SELECTED_LABEL; // 定数で管理
    }

    function removeNumberingAndBorder(container) {
        // 青い枠と番号を削除
        container.style.border = 'none';
        const label = container.querySelector('.selected-label');
        if (label) label.remove();
    }

    function updateImageNumbers(tabCategory) {
        const columnMapping = {
            'kaimetsu': [0, 7, 14],
            'junsyu': [1, 8, 15],
            'kyomu': [2, 9, 16],
            'tie': [3, 10, 17],
            'songo': [4, 11, 18],
            'tyouwa': [5, 12, 19],
            'houjou': [6, 13, 20]
        };

        const selectedCategory = tabSelections[tabCategory] || [];
        const positions = columnMapping[tabCategory] || [];

        selectedCategory.forEach((src, index) => {
            const imgContainer = document.querySelector(`.image-item[data-src="${src}"]`).parentElement;
            addNumberingAndBorder(imgContainer, index + 1);
        });
    }

    function repositionImages(tabCategory) {
        const columnMapping = {
            'kaimetsu': [0, 7, 14],
            'junsyu': [1, 8, 15],
            'kyomu': [2, 9, 16],
            'tie': [3, 10, 17],
            'songo': [4, 11, 18],
            'tyouwa': [5, 12, 19],
            'houjou': [6, 13, 20]
        };

        const selectedCategory = tabSelections[tabCategory] || [];
        const positions = columnMapping[tabCategory] || [];

        // 上部の該当するタブの画像だけをクリア
        positions.forEach(position => {
            cells[position].innerHTML = '';
        });

        // 現在の選択画像で再配置
        selectedCategory.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = `${imageFolder}${src}`;
            img.classList.add('selected');
            const cellIndex = positions[index];
            if (cellIndex !== undefined) {
                console.log(`Placing image ${src} at position ${cellIndex}`);
                cells[cellIndex].appendChild(img);
            }
        });

        // ラベルの更新
        updateImageNumbers(tabCategory);
    }

    function restoreSelectionState(category) {
        const selectedCategory = tabSelections[category] || [];
        const columnMapping = {
            'kaimetsu': [0, 7, 14],
            'junsyu': [1, 8, 15],
            'kyomu': [2, 9, 16],
            'tie': [3, 10, 17],
            'songo': [4, 11, 18],
            'tyouwa': [5, 12, 19],
            'houjou': [6, 13, 20]
        };
        const positions = columnMapping[category] || [];

        // 他のタブをクリアせずに、選択状態を復元
        selectedCategory.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = `${imageFolder}${src}`;
            img.classList.add('selected');
            const cellIndex = positions[index];
            if (cellIndex !== undefined) {
                cells[cellIndex].appendChild(img);
            }
        });

        // 青枠と☑の復元
        const imageContainers = document.querySelectorAll(`.tab-content .image-container .image-item[data-category="${category}"]`);
        imageContainers.forEach(img => {
            if (selectedCategory.includes(img.dataset.src)) {
                const container = img.parentElement;
                const selectedIndex = selectedCategory.indexOf(img.dataset.src);
                addNumberingAndBorder(container, selectedIndex + 1);  // ラベルと青枠を追加
            }
        });

        // ラベルの更新
        updateImageNumbers(category);
    }

    // 保存ボタンのクリックイベントを追加
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const tabCategory = document.querySelector('.tab-label.active').dataset.category;
            saveImage(tabCategory);
        });
    }
}

function saveImage() {
    html2canvas(document.getElementById('grid'), { 
        useCORS: true, 
        scale: 2 // スケールを調整して解像度を上げる
    }).then(canvas => {
        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            
            // 現在の日時を「yyyyMMdd_HHmmss」形式にフォーマット
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const formattedDate = `${year}${month}${day}_${hours}${minutes}${seconds}`;
            link.download = `スタレ推しキャラランキング_運命_${formattedDate}.png`; // ファイル名の変更
            
            link.click();
        }, 'image/png');
    }).catch(error => {
        console.error('Error capturing image:', error);
    });
}

document.addEventListener('DOMContentLoaded', loadImages);

