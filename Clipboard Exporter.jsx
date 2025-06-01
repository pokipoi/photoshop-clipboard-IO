// Photoshop JSX 部分
function exportAndCopyToClipboard() {
    try {
        // 获取当前文档
        var doc = app.activeDocument; // 确保获取当前活动文档
        if (!doc) {
            throw new Error("没有打开的文档。");
        }

        // 获取当前日期时间并格式化
        var now = new Date();
        var dateStr = now.getFullYear().toString() +
                    ("0" + (now.getMonth() + 1)).slice(-2) +
                    ("0" + now.getDate()).slice(-2) + "_" +
                    ("0" + now.getHours()).slice(-2) +
                    ("0" + now.getMinutes()).slice(-2) +
                    ("0" + now.getSeconds()).slice(-2);

        // 准备文件名和临时保存路径
        var fileName = "PsClipboardata_" + dateStr + ".png";
        var tempFolder = new Folder(Folder.temp + "/PasteIntoFile/");

        // 确保目标文件夹存在
        if (!tempFolder.exists) {
            tempFolder.create();
        }
        
        var tempPath = Folder.temp + "/PasteIntoFile/" + fileName;


        // 导出文件
        var pngOptions = new ExportOptionsSaveForWeb(); // 确保定义 PNG 导出选项
        pngOptions.format = SaveDocumentType.PNG; // 设置格式
        pngOptions.PNG8 = false; // 设置为 PNG-24

        doc.exportDocument(new File(tempPath), ExportType.SAVEFORWEB, pngOptions);
        
        // 文件校验，直到文件存在
        var fileCheckInterval = 100; // 检查间隔时间（毫秒）
        var maxAttempts = 50; // 最大尝试次数
        var attempts = 0;

        while (!File(tempPath).exists && attempts < maxAttempts) {
            $.sleep(fileCheckInterval); // 等待一段时间再检查
            attempts++;
        }

        // 检查文件是否存在
        if (File(tempPath).exists) {
            // 准备 PowerShell 命令，隐藏窗口
            var pasteCommand = 'powershell.exe -Command "& {Start-Process \\"C:\\Program Files (x86)\\PasteIntoFile\\PasteIntoFile.exe\\" -ArgumentList \\"copy %TEMP%\\PasteIntoFile\\' + fileName + '\\"}"';
            // 执行 PowerShell 命令
            app.system(pasteCommand);
            
        } else {
            alert("文件未成功保存，请检查。");
        }

    } catch(e) {
        alert("发生错误：" + e);
    }
}

// 执行函数
exportAndCopyToClipboard();