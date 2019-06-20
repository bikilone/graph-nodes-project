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
    return this.graphNodes.filter(node => node.objectId === id)[0];
  }
  findChildren(id: string) {
    return this.graphNodes.filter(node => {
      if (!node.parentObjects) {
        return;
      }
      return node.parentObjects.includes(id);
    });
  }

  findAllParents(id: string) {
    const parents = [];
    function findParent(node: GraphNode) {
      if (node.parentObjects) {
        parents.push(node.parentObjects);
        findParent(this.getNode(node.parentObjects[0]));
      } else {
        return parents;
      }
    }
    // findParent(this.getNode(id));
  }

  updateNode(
    id: string,
    data: { objectId: string; userId: string; roles: string[]; groupId: string }
  ) {
    const { objectId, userId, roles, groupId } = data;
    // find all children
    this.findChildren(id).forEach(node => {
      node.parentObjects[0] = objectId;
    });

    const node = this.getNode(id);
    node.objectId = objectId;
    node.explicitRolesAssignment[0].userId = userId;
    node.explicitRolesAssignment[0].groupId = groupId;
    node.explicitRolesAssignment[0].roles = roles;
    console.log(this.getAllNodes());
  }
}
