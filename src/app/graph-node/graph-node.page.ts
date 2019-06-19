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
    this.form = new FormGroup({
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
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        return;
      }
      this.selectedNode = this.graphNodesService.getNode(paramMap.get("id"))[0];
      console.log(this.selectedNode);

      this.childrenNodes = this.graphNodesService.findChildren(
        paramMap.get("id")
      );
    });
  }

  onSubmit() {}
}
