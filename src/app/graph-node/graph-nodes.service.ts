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

  getAllIds(currentId: string) {
    const ids = [];
    this.graphNodes.forEach(node => {
      if (node.objectId !== currentId) {
        ids.push(node.objectId);
      }
    });
    return ids;
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
  }

  allPossibleParents(id: string) {
    const node = this.getNode(id);
    let parents = [];
    let forbiddenParents = [];
    const children = this.findChildren(id);
    const childrenIds = children.map(kid => kid.objectId);
    const posssibleParents = this.getAllIds(id);
    let filteredParents;
    if (node.parentObjects === null) {
      // root element
      filteredParents = [];
      return filteredParents;
    }
    // if there is no children
    if (children.length === 0) {
      filteredParents = posssibleParents;
      return filteredParents;
    }
    // exclude all of the children

    filteredParents = posssibleParents.filter(
      parent => !childrenIds.includes(parent)
    );
    return filteredParents;
  }

  updateNode(
    id: string,
    data: {
      objectId: string;
      parentObjects;
      userId: string;
      roles: string[];
      groupId: string;
    }
  ) {
    const { objectId, parentObjects, userId, roles, groupId } = data;

    // find all children and keeping the connection between parent and child
    this.findChildren(id).forEach(node => {
      node.parentObjects[0] = objectId;
    });

    const node = this.getNode(id);

    node.objectId = objectId;
    node.parentObjects = parentObjects;
    node.explicitRolesAssignment[0].userId = userId;
    node.explicitRolesAssignment[0].groupId = groupId;
    node.explicitRolesAssignment[0].roles = roles;
  }
}
