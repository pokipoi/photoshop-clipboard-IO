// Enable double-byte character support
app.bringToFront();

try {
    // Define paths
    var tempPath = Folder.temp + "/WebPasteboardata.png";
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
                        throw new Error("Cannot delete temp file");
                    }
                } catch(e) {
                    alert("结束进程后仍无法删除临时文件: " + e);
                    throw new Error(e);
                }
            }
        } catch(e) {
            alert("删除已存在的临时文件失败: " + e);
            throw new Error(e);
        }
    }
    // Execute PasteIntoFile to save clipboard to PNG using hidden PowerShell
    var pasteCommand = 'powershell.exe -Command "& \\"C:\\Program Files (x86)\\PasteIntoFile\\PasteIntoFile.exe\\" -f \\"$env:TEMP\\WebPasteboardata.png\\" --overwrite"';
    app.system(pasteCommand);
    
    // Wait for file to be created with timeout
    var checkInterval = 100; // Check every 100ms
    var maxAttempts = 50;    // Maximum 5 seconds total
    var attempts = 0;
    var fileFound = false;
    
    while (attempts < maxAttempts) {
        if (File(tempPath).exists) {
            fileFound = true;
            break;
        }
        $.sleep(checkInterval);
        attempts++;
    }
    
    if (!fileFound) {
        alert("超时：等待临时文件创建失败");
        throw new Error("Timeout waiting for temp file creation");
    }
    
    // Check if temp file exists
    if (File(tempPath).exists) {
        if (app.documents.length > 0) {
            var doc = app.activeDocument;
            
            // Place embedded to preserve transparency
            var idPlc = charIDToTypeID("Plc ");
            var desc = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            desc.putPath(idnull, new File(tempPath));
            var idFTcs = charIDToTypeID("FTcs");
            var idQCSt = charIDToTypeID("QCSt");
            var idQcsa = charIDToTypeID("Qcsa");
            desc.putEnumerated(idFTcs, idQCSt, idQcsa);
            executeAction(idPlc, desc, DialogModes.NO);
            
            // Convert placed layer to smart object directly
            executeAction(charIDToTypeID("CnvS"), undefined, DialogModes.NO);
            
            // Clean up temp file
            File(tempPath).remove();
        } 
    } else {
        throw new Error("Temp file not found: " + tempPath);
    }
} catch(e) {
    alert("Error: " + e);
}