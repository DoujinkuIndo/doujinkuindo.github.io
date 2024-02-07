const fs = require('fs');

const folderPath = '_includes/_shared_block'; // 업데이트하려는 폴더의 경로
const outputPath = '_data/AlgorithmAndDataStruct'; // 결과를 저장할 Markdown 파일 경로

// 결과를 저장할 배열
dataList = []; // 결과를 저장할 배열

/**
 * 디렉토리를 순환하며 dataList를 만듭니다.
 * 폴더일 경우 Title을 만들고, 파일일 경우 Content를 만듭니다.
 */
function circuitDirectory(dirDepth, curruntPath) {
    fs.readdirSync(curruntPath).forEach((name) => {
        const filePath = `${curruntPath}/${name}`;
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            makeTitleData(dirDepth, name, filePath);

            circuitDirectory(dirDepth, filePath);
        } else {
            makeContentData(dirDepth, name, filePath);
        }
    });
}

/**
 * 타이틀 데이터를 만듭니다.
 * 
 * depth만큼 #을 header로 추가합니다. 예를 들어 depth가 2이면 ##을 추가합니다.
 */
function makeTitleData(depth, name, Path)
{
    header = "";
    for (let i = 0; i < depth; i++) {
        header += "#";
    }

    dataList.push({
        Type: "Title",
        Header: header,
        Name: name,
    });
}

/** 
 * 컨텐츠 데이터를 만듭니다.
 */
function makeContentData(depth, name, path)
{
    dataList.push({
        Type: "Content",
        Name: name,
        Path: path,
    });
}

/**
 * 폴더 목록을 업데이트하고 결과를 출력하는 함수
 */
try {
    console.log('updateSharedBlockBlock: Start \n');

    circuitDirectory(0, folderPath);
    const json = JSON.stringify(dataList, null, 2);
    fs.writeFileSync(outputPath, json);

    console.log('updateSharedBlockBlock: End \n');
} catch (err) {
    console.error(err);
    process.exit(1);
}
