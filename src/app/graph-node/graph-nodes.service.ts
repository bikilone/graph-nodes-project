import { Injectable } from "@angular/core";
import { GraphNode } from "./graph-node.model";

@Injectable({
  providedIn: "root"
})
export class GraphNodesService {
  public graphNodes: GraphNode[] = [
    new GraphNode("01", null, "u1", null, ["Role1"]),
    new GraphNode("02", ["01"], "u2", null, ["Role2"]),
    new GraphNode("03", ["01"], "u3", null, ["Role3"]),
    new GraphNode("04", ["02"], "u4", null, ["Role4"])
  ];

  constructor() {}

  getAllNodes() {
    return this.graphNodes;
  }

  getNode(id: string) {
    return this.graphNodes.filter(node => node.objectId === id);
  }
}
