import { Component, OnInit } from "@angular/core";
import { GraphNodesService } from "./graph-nodes.service";
import { ActivatedRoute } from "@angular/router";
import { GraphNode } from "./graph-node.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-graph-node",
  templateUrl: "./graph-node.page.html",
  styleUrls: ["./graph-node.page.scss"]
})
export class GraphNodePage implements OnInit {
  selectedNode: GraphNode;
  childrenNodes: GraphNode[];
  form: FormGroup;
  constructor(
    private graphNodesService: GraphNodesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        return;
      }
      this.selectedNode = this.graphNodesService.getNode(paramMap.get("id"))[0];
      console.log(this.selectedNode);

      const objectId = this.selectedNode.objectId;
      const parentObjects = this.selectedNode.parentObjects
        ? this.selectedNode.parentObjects
        : "root";
      const userId = this.selectedNode.explicitRolesAssignment
        ? this.selectedNode.explicitRolesAssignment[0].userId
        : "";

      const groupId = this.selectedNode.explicitRolesAssignment
        ? this.selectedNode.explicitRolesAssignment[0].groupId
        : "";
      const roles = this.selectedNode.explicitRolesAssignment
        ? this.selectedNode.explicitRolesAssignment[0].roles
        : [""];
      console.log(objectId, parentObjects, userId, groupId, roles);

      this.childrenNodes = this.graphNodesService.findChildren(
        paramMap.get("id")
      );
      this.form = new FormGroup({
        objectId: new FormControl(objectId, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        parentObjects: new FormControl(null, {
          updateOn: "blur",
          validators: [Validators.required]
        }),
        userId: new FormControl(null, {
          updateOn: "blur"
        }),
        groupId: new FormControl(null, {
          updateOn: "blur"
        }),
        roles: new FormControl(null, {
          updateOn: "blur"
        })
      });
    });
  }

  onSubmit() {}
}
