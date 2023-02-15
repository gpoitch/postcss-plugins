import { FunctionNode, SimpleBlockNode } from '@csstools/css-parser-algorithms';
import { Calculation } from '../calculation';
import { Globals } from '../util/globals';
export declare function calc(calcNode: FunctionNode | SimpleBlockNode, globals: Globals): Calculation | -1;
export declare function clamp(clampNode: FunctionNode, globals: Globals): Calculation | -1;
export declare function max(maxNode: FunctionNode, globals: Globals): Calculation | -1;
export declare function min(minNode: FunctionNode, globals: Globals): Calculation | -1;
export declare function round(roundNode: FunctionNode, globals: Globals): Calculation | -1;
export declare function mod(modNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function rem(remNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function abs(absNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function sign(signNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function sin(sinNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function cos(cosNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function tan(tanNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function asin(asinNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function acos(acosNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function atan(atanNodes: FunctionNode, globals: Globals): Calculation | -1;
export declare function atan2(atan2Nodes: FunctionNode, globals: Globals): Calculation | -1;
