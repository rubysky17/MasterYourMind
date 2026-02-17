import { useMemo } from 'react';

// --- DEFINITIONS & TYPES ---
export type MathOperation = "+" | "-" | "*" | "/";

export interface LevelItem {
    id: number | string;
    name: "Novice" | "Pro" | "Elite";
    operation: MathOperation[];
}

export interface Question {
    number: number[];
    operator: MathOperation[];
    answer: number;
    expression: string;
}

// --- HELPER FUNCTIONS ---
const getFactors = (num: number): number[] => {
    if (num <= 1) return [];
    const factors = [];
    for (let i = 2; i <= num; i++) {
        if (num % i === 0) factors.push(i);
    }
    return factors;
};

const getPrecedence = (op: MathOperation) => {
    if (op === "*" || op === "/") return 2;
    return 1;
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- MAIN HOOK ---
export function useGenerateGame({
    levelSelected,
    maxQuestion,
    gameRound = 0,
}: {
    levelSelected: LevelItem | null;
    maxQuestion: number;
    gameRound?: number;
}) {
    const gameData = useMemo(() => {
        if (!levelSelected) return [];

        const questions: Question[] = [];

        while (questions.length < maxQuestion) {
            
            // --- CẤU HÌNH ĐỘ KHÓ (CÓ XEN KẼ) ---
            let minTerms = 2;
            let maxTerms = 3;
            let rangeMin = 1;
            let rangeMax = 10;
            let isHardNovice = false; // Cờ đánh dấu câu hỏi khó

            if (levelSelected.name === "Novice") {
                // LOGIC XEN KẼ: Chỉ 15% câu hỏi là "Hardcore" (tương đương 2-3 câu trong bộ 20 câu)
                isHardNovice = Math.random() > 0.85; 

                if (isHardNovice) {
                    // Cấu hình khó: Nhiều số, số to
                    minTerms = 4; 
                    maxTerms = 6; 
                    rangeMin = 10;
                    rangeMax = 1000; 
                } else {
                    // Cấu hình chuẩn: 2 số, 2 chữ số (dễ thở)
                    minTerms = 2;
                    maxTerms = 2; // Đôi khi lên 3 số nếu muốn
                    rangeMin = 10;
                    rangeMax = 99;
                }
            } else if (levelSelected.name === "Pro") {
                minTerms = 2; maxTerms = 3; rangeMin = 10; rangeMax = 500;
            } else { // Elite
                minTerms = 3; maxTerms = 4; rangeMin = 50; rangeMax = 999;
            }

            // Random số lượng phần tử
            const termsCount = getRandomInt(minTerms, maxTerms);

            // Khởi tạo số đầu tiên
            let currentVal = getRandomInt(rangeMin, rangeMax);

            const numbers: number[] = [currentVal];
            const operators: MathOperation[] = [];

            let expressionStr = `${currentVal}`;
            let currentPrecedence = 3;

            // --- VÒNG LẶP TẠO CHUỖI SỐ ---
            for (let j = 0; j < termsCount - 1; j++) {
                let op: MathOperation = "+";
                
                if (levelSelected.name === "Novice") {
                    // Novice luôn ưu tiên cộng trừ
                    op = Math.random() > 0.8 ? "-" : "+";
                } else {
                    op = levelSelected.operation[Math.floor(Math.random() * levelSelected.operation.length)];
                }

                let nextNum = 0;

                // --- LOGIC TẠO SỐ TIẾP THEO ---
                if (levelSelected.name === "Novice") {
                    if (isHardNovice) {
                        // Nếu là câu khó: Trộn số to nhỏ lộn xộn (Jagged Magnitude)
                        const magnitude = Math.random();
                        if (magnitude > 0.7) nextNum = getRandomInt(100, 999); // Hàng trăm
                        else if (magnitude > 0.4) nextNum = getRandomInt(10, 99); // Hàng chục
                        else nextNum = getRandomInt(1, 9); // Hàng đơn vị
                    } else {
                        // Nếu là câu dễ: Chỉ cộng trừ số 2 chữ số bình thường
                        nextNum = getRandomInt(10, 99);
                    }
                } else {
                    // Pro/Elite logic
                    nextNum = getRandomInt(1, 50); 
                }

                // --- LOGIC TÍNH TOÁN & VALIDATION (GIỮ NGUYÊN) ---
                if (op === "/") {
                     const factors = getFactors(currentVal);
                     if (factors.length > 0) {
                         nextNum = factors[Math.floor(Math.random() * factors.length)];
                         currentVal /= nextNum;
                     } else {
                         op = Math.random() > 0.5 ? "+" : "-";
                     }
                }

                if (op !== "/") {
                    if (op === "+") {
                        // Giới hạn tổng tùy theo độ khó
                        const limit = (levelSelected.name === "Novice" && !isHardNovice) ? 200 : 20000;
                        
                        if (currentVal + nextNum > limit) { 
                             op = "-";
                             if (currentVal - nextNum < 0) { currentVal += nextNum; op = "+"; }
                             else currentVal -= nextNum;
                        } else {
                            currentVal += nextNum;
                        }
                    } 
                    else if (op === "-") {
                        if (currentVal - nextNum < 0) {
                            currentVal += nextNum; op = "+";
                        } else {
                            currentVal -= nextNum;
                        }
                    } 
                    else if (op === "*") {
                         if (currentVal * nextNum > 5000) { currentVal += nextNum; op = "+"; }
                         else currentVal *= nextNum;
                    }
                }

                // --- FORMAT HIỂN THỊ ---
                const newOpPrecedence = getPrecedence(op);
                if (newOpPrecedence > currentPrecedence) {
                    expressionStr = `(${expressionStr})`;
                }
                expressionStr = `${expressionStr} ${op} ${nextNum}`;
                currentPrecedence = newOpPrecedence;

                operators.push(op);
                numbers.push(nextNum);
            }

            // --- FINAL CHECK ---
            const maxLimit = (levelSelected.name === "Novice" && !isHardNovice) ? 300 : 30000;
            if (currentVal >= 0 && currentVal < maxLimit) {
                questions.push({
                    number: numbers,
                    operator: operators,
                    answer: currentVal,
                    expression: expressionStr
                });
            }
        }
        return questions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [levelSelected, maxQuestion, gameRound]);

    return gameData;
}