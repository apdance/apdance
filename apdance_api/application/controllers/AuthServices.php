<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:37
 */

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';
/**
 * @property CI_DB_query_builder db
*/
class AuthServices extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function checkSession_get(){
        //check session active$
        $this->db->where("session_token", $this->head('token'));

        $session = $this->db->get("session")->row_object();

        if(!empty($session)){
            $code = $this::HTTP_OK;
        }else{
            $code = $this::HTTP_UNAUTHORIZED;
        }

        $this->db->where("user_id", $session->session_user_id);
        $resOrg = $this->db->get("user_org")->row_object();


        $this->response(array(
            'success'=>!empty($session),
            'metadata'=>array(
                'resource'=>'session'
            ),
            'data'=>array(),
            'vinculo'=>!empty($resOrg),
            'mag'=>!empty($session) ? "Sessão ativa" : "Sessão inativa"
        ), $code);
    }

    /**
     * Verifica se a sessão está ativa através do token de sessão
     * Se estiver retorna true, se não false.
     * http header => token
     *
     * As funções nessa classe devem conter no final _ mais o verbo http exemplo Login_post em que post é o verbo.
     * Ou seja, o tipo de metodo.
    */
    public function Login_post(){

        $post = $this->post();

        $return = array(
            'success'=>false,
            'metadata'=>array(
                'resource'=>'Login'
            ),
        );

        $this->db->from("users");

        if(empty($post['email']) OR empty($post['passwd'])){

            $return['msg'] = "Email e senha são necessários.";
            $this->response($return, $this::HTTP_BAD_REQUEST);
        }


        $this->db->join("user_org", "user_org.user_id = users.id", 'left');
        $this->db->join("organizacao", "organizacao.org_id = user_org.org_id", 'left');



        //ok::email e senha informados
        $this->db->or_group_start();
        $this->db->where("user_email", $post['email']);
        $this->db->or_where("user_login", $post['email']);
        $this->db->group_end();

        $this->db->where("user_passwd", md5($post['passwd']));

        //buscar
        $res = $this->db->get()->row_object();


        //build hash

        if(empty($res)){
            $return['msg'] = "Email ou senha incorreta.";
            $this->response($return, $this::HTTP_UNAUTHORIZED);
        }



        $return['success'] = true;
        $return['user'] = $res;
        $return['profile'] = array();
        $return['token'] = md5($post['email'].$post['passwd'].(date('his')));
        $return['msg'] = "Usuário logado com sucesso";

        $this->db->insert("session", array(
            'session_token'=>$return['token'],
            'session_user_id'=>$res->id
        ));



        $this->response($return);
    }
}