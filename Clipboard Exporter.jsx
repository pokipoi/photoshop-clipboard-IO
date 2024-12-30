// @photoshop-jsx
// This script is intended for use with Adobe Photoshop.
// Photoshop JSX 部分
function exportAndCopyToClipboard() {
    try {
        // 检查并删除已存在的临时文件
        var tempPath = Folder.temp + "/PsClipboardata.png";
        var existingFile = new File(tempPath);
        
        // 如果文件存在，尝试删除
        if (existingFile.exists) {
            try {
                existingFile.remove();
                // 等待文件被删除
                var deleteCheckInterval = 100;
                var deleteMaxAttempts = 20;
                var deleteAttempts = 0;
                
                while (File(tempPath).exists && deleteAttempts < deleteMaxAttempts) {
                    $.sleep(deleteCheckInterval);
                    deleteAttempts++;
                }
                
                // 如果文件仍然存在，尝试结束进程后再删除
                if (File(tempPath).exists) {
                    // 结束 PasteIntoFile.exe 进程
                    var killCommand = 'cmd /c taskkill /F /IM PasteIntoFile.exe';
                    app.system(killCommand);
                    
                    // 等待进程结束
                    $.sleep(500);
                    
                    // 再次尝试删除文件
                    try {
                        existingFile.remove();
                        if (File(tempPath).exists) {
                            alert("即使结束进程后仍无法删除临时文件");
                            return;
                        }
                    } catch(e) {
                        alert("结束进程后仍无法删除临时文件: " + e);
                        return;
                    }
                }
            } catch(e) {
                alert("删除已存在的临时文件失败: " + e);
                return;
            }
        }

        // 获取当前文档
        var doc = app.activeDocument; // 确保获取当前活动文档
        if (!doc) {
            throw new Error("没有打开的文档。");
        }

        // 准备临时保存路径
        var tempPath = Folder.temp + "/PsClipboardata.png";
        
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
            var pasteCommand = 'cmd /c start /min powershell -WindowStyle Hidden -Command "& {Start-Process \\"C:\\Program Files (x86)\\PasteIntoFile\\PasteIntoFile.exe\\" -ArgumentList \\"copy %TEMP%\\PsClipboardata.png\\"}"';
            // 执行 PowerShell 命令
            app.system(pasteCommand);
            
        } else {
            alert("文件未成功保存，请检查。");
        }

        // ... existing code ...
    } catch(e) {
        alert("发生错误：" + e);
    }
}

// 执行函数
exportAndCopyToClipboard();